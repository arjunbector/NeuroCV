import { SubscriptionType } from "./types";

export function canCreateResume(
    subscriptionLevel: SubscriptionType,
    currentResumeCount: number
) {
    const maxResumeMap: Record<SubscriptionType, number> = {
        FREE: 1,
        PREMIUM: 3,
        PREMIUM_PLUS: Infinity,
    }

    const maxResumes = maxResumeMap[subscriptionLevel];
    return currentResumeCount < maxResumes;
}


export function canUseAITools(subscriptionLevel: SubscriptionType) {
    return subscriptionLevel !== "FREE";
}

export function canUseCustomization(subscriptionLevel: SubscriptionType) {
    return subscriptionLevel === "PREMIUM_PLUS";
}