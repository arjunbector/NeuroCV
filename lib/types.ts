import { Prisma } from '@prisma/client';
import { ResumeValues } from "./validations";

export interface EditorFormProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude: Prisma.ResumeInclude = {
    workExperiences: true,
    educations: true,
}

export type ResumeServerData = Prisma.ResumeGetPayload<{
    include: typeof resumeDataInclude;
}>

export type SubscriptionType = "FREE" | "PREMIUM" | "PREMIUM_PLUS";
export type SubscriptionAmount = 0 | 500 | 1000;