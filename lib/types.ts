import { Prisma } from "./generated/prisma";
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