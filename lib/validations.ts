import z from "zod";
export const optionalString = z.string().trim().optional().or(z.literal(""));

export const genereInfoSchema = z.object({
    title: optionalString,
    description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof genereInfoSchema>;


const FILE_SIZE_LIMIT = 1024 * 1024 * 4; // 4MB
export const personalInfoSchema = z.object({
    photo: z.custom<File | undefined>().refine((file) => !file || (file instanceof File && file.type.startsWith('image/')), "Must be an image").refine((file) => !file || file.size <= FILE_SIZE_LIMIT, `File must be less than ${FILE_SIZE_LIMIT}MB`),
    firstName: optionalString,
    lastName: optionalString,
    jobTitle: optionalString,
    city: optionalString,
    country: optionalString,
    phone: optionalString,
    email: optionalString
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;


export const workExperienceSchema = z.object({
    workExperiences: z.array(
        z.object({
            position: optionalString,
            company: optionalString,
            startDate: optionalString,
            endDate: optionalString,
            description: optionalString,
        })
    ).optional()
})

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export const projectsSchema = z.object({
    projects: z.array(
        z.object({
            title: optionalString,
            description: optionalString,
            link: optionalString,
            startDate: optionalString,
            endDate: optionalString,
        })
    ).optional()
})

export type ProjectsValues = z.infer<typeof projectsSchema>;

export type Project = NonNullable<z.infer<typeof projectsSchema>["projects"]>[number];


export const educationSchema = z.object({
    educations: z.array(
        z.object({
            degree: optionalString,
            school: optionalString,
            startDate: optionalString,
            endDate: optionalString,
            marks: optionalString,
        })
    ).optional()
})

export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
    skills: z.array(z.string().trim()).optional()
})

export type SkillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
    summary: optionalString
})

export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
    ...genereInfoSchema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...projectsSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
    colorHex: optionalString,
    borderStyle: optionalString,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
    id?: string;
    photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
    description: z.string().trim().min(1, "Required").min(20, "Must be at least 20 characters")
})
export const generateProjectInfoSchema = z.object({
    description: z.string().trim().min(1, "Required").min(20, "Must be at least 20 characters")
})

export type GenerateWorkExperienceInput = z.infer<typeof generateWorkExperienceSchema>;
export type GenerateProjectInfoInput= z.infer<typeof generateProjectInfoSchema>;

export type WorkExperience = NonNullable<z.infer<typeof workExperienceSchema>["workExperiences"]>[number];

export const generateSummarySchema = z.object({
    jobTitle: optionalString,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
})

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;