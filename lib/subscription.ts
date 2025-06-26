import { cache } from "react";
import prisma from "./prisma";
import { auth } from "@clerk/nextjs/server";

export const getPlanDetails = cache(async (): Promise<"FREE" | "PREMIUM"> => {
    const { userId } = await auth();
    if (!userId) {
        return "FREE"
    }
    const plan = await prisma.userSubscription.findFirst({
        where: { userId }
    });
    return plan?.plan ?? "FREE";
});

export const SUBSCRIPTION_AMOUNT: {
    [amount: number]: "PREMIUM" | "FREE"
} = {
    0: "FREE",
    500: "PREMIUM",
}
