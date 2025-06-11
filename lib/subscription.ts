import { cache } from "react";
import prisma from "./prisma";
import { auth } from "@clerk/nextjs/server";

export const getPlanDetails = cache(async (): Promise<{ plan: "FREE" | "PREMIUM" | "PREMIUM_PLUS" }> => {
    const { userId } = await auth();
    if (!userId) {
        return { plan: "FREE" }
    }
    const plan = await prisma.userSubscription.findFirst({
        where: { userId }
    });
    return { plan: plan?.plan ?? "FREE" };
});

export const SUBSCRIPTION_AMOUNT: {
    [amount: number]: "PREMIUM" | "PREMIUM_PLUS" | "FREE"
} = {
    0: "FREE",
    500: "PREMIUM",
    1000: "PREMIUM_PLUS",
}
