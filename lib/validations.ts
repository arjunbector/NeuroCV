import z from "zod";
export const optionaString = z.string().trim().optional().or(z.literal(""));

export const genereInfoSchema = z.object({
    title: optionaString,
    description: optionaString,
});

export type GeneralInfoValues = z.infer<typeof genereInfoSchema>;
