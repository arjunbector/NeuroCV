"use server"

import prisma from "@/lib/prisma";
import { SUBSCRIPTION_AMOUNT } from "@/lib/subscription";
import { SubscriptionAmount } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";
import Razorpay from "razorpay";


const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
const key_secret = process.env.RAZORPAY_KEY_SECRET

const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
})


export async function createPremiumSubscription(amount: SubscriptionAmount) {
    const { userId } = await auth()
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const order = await razorpay.orders.create({
        amount: amount * 100, // Amount in paise
        currency: "INR",
    });

    await prisma.order.deleteMany({
        where: {
            userId: userId,
        }
    })

    try {
        await prisma.order.create({
            data: {
                userId: userId,
                razorPayOrderId: order.id,
                amount: amount,
                status: "PENDING",
                plan: SUBSCRIPTION_AMOUNT[amount] || "FREE", // Default to FREE if not found
            }
        })

    } catch (error) {
        console.error("Error creating order in database:", error);
        throw new Error("Database error: Unable to create order");
    }
    if (!order) {
        throw new Error("Failed to create order");
    }
    return order;
}







const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string
) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET as string;

    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;
};

export async function verifyOrder(orderId: string, razorpayPaymentId: string, razorpaySignature: string) {


    try {
        const signature = generatedSignature(orderId, razorpayPaymentId);
        if (signature !== razorpaySignature) {
            await prisma.order.update({
                data: {
                    status: "FAILED",
                },
                where: {
                    razorPayOrderId: orderId,
                }
            })
            throw new Error("Payment verification failed: Invalid signature");
        }

        const dbOrder = await prisma.order.update({
            data: {
                status: "COMPLETED",
            },
            where: {
                razorPayOrderId: orderId,
            }
        })
        if (!dbOrder) {
            throw new Error("Order not found in database");
        }

        await prisma.userSubscription.create({
            data: {
                userId: dbOrder.userId,
                plan: dbOrder.plan,
                orderId: dbOrder.id,
            }
        })


        return {
            success: true,
            message: "Payment verified successfully",
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        return {
            success: false,
            message: "Payment verification failed",
            error: error instanceof Error ? error.message : "Unknown error",
        }
    }
}