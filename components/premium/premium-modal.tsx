"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePremiumModal from "@/hooks/usePremiumModal";
import { SubscriptionAmount } from "@/lib/types";
import { CheckIcon } from "lucide-react";
import Script from "next/script";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { createPremiumSubscription, verifyOrder } from "./actions";
import LoadingButton from "../loading-button";
import { useState } from "react";

const PREMIUM_FEATURES = ["AI Tools", "Upto 3 resumes"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const [loading, setLoading] = useState(false);

  const createOrder = async (amount: SubscriptionAmount) => {
    try {
      setLoading(true);
      const data = await createPremiumSubscription(amount);
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        handler: async (res: any) => {
          // verify payment
          const { success } = await verifyOrder(
            res.razorpay_order_id,
            res.razorpay_payment_id,
            res.razorpay_signature,
          );
          if (success) {
            toast.success("Subscription activated successfully!");
            window.location.reload();
          }
        },
      };
      setOpen(false);
      const payment = new (window as any).Razorpay(paymentData);
      payment.open();
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>NeuroCV AI Premium</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <p>Get a premium subscription to unlock more features.</p>
            <div className="flex flex-col items-center space-y-5 rounded-4xl border p-4">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {PREMIUM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <LoadingButton
                loading={loading}
                variant="default"
                className="w-full"
                onClick={() => {
                  createOrder(500);
                }}
              >
                Get Premium
              </LoadingButton>
            </div>
            <p className="text-muted-foreground text-xs">
              The payments are in development mode, so won't be deducted from
              your account. Just click on 'Get Premiuim', select any payment
              method apart form card and enjoy your free premium pass.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
