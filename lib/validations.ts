import z from "zod";
export const optionaString = z.string().trim().optional().or(z.literal(""));

export const genereInfoSchema = z.object({
    title: optionaString,
    description: optionaString,
});

export type GeneralInfoValues = z.infer<typeof genereInfoSchema>;


const FILE_SIZE_LIMIT = 1024 * 1024 * 4; // 4MB
export const personalInfoSchema = z.object({
    photo: z.custom<File | undefined>().refine((file) => !file || (file instanceof File && file.type.startsWith('image/')), "Must be an image").refine((file) => !file || file.size <= FILE_SIZE_LIMIT, `File must be less than ${FILE_SIZE_LIMIT}MB`),
    firstName: optionaString,
    lastName: optionaString,
    jobTitle: optionaString,
    city: optionaString,
    country: optionaString,
    phone: optionaString,
    email: optionaString
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;


export const workExperienceSchema = z.object({
    workExperiences: z.array(
        z.object({
            position: optionaString,
            company: optionaString,
            startDate: optionaString,
            endDate: optionaString,
            description: optionaString,
        })
    ).optional()
})

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export const educationSchema = z.object({
    educations: z.array(
        z.object({
            degree: optionaString,
            school: optionaString,
            startDate: optionaString,
            endDate: optionaString,
            marks: optionaString,
        })
    ).optional()
})

export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
    skills: z.array(z.string().trim()).optional()
})

export type SkillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
    summary: optionaString
})

export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
    ...genereInfoSchema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
    id?: string;
    photo?: File | string | null;
};