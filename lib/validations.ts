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