import { SubscriptionType } from "./types";

export function canCreateResume(
    subscriptionLevel: SubscriptionType,
    currentResumeCount: number
) {
    const maxResumeMap: Record<SubscriptionType, number> = {
        FREE: 3,
        PREMIUM: Infinity,
        PREMIUM_PLUS: Infinity,
    }

    const maxResumes = maxResumeMap[subscriptionLevel];
    return currentResumeCount < maxResumes;
}


export function canUseAITools(subscriptionLevel: SubscriptionType) {
    return true;
}

export function canUseCustomization(subscriptionLevel: SubscriptionType) {
    return subscriptionLevel === "PREMIUM_PLUS"
}