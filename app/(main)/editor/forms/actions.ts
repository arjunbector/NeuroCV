"use server";

import { gemini } from "@/lib/gemini";
import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validations";

export async function generateSummary(input: GenerateSummaryInput) {
    const { educations, jobTitle, skills, workExperiences } = generateSummarySchema.parse(input);

    const systemMessage = `
You are a professional resume summary generator AI. Your job is to craft a concise, compelling, and professional resume summary based on the user's background. Highlight key experiences, skills, and educational qualifications relevant to the job title. Do not include any explanations or additional commentary. Only return the summary. Tone should be confident, formal, and tailored to a professional audience.
`;

    const userMessage = `
Generate a professional resume summary using the details below:

Job Title: ${jobTitle || "N/A"}

Work Experience:
${workExperiences?.map(exp => `
- Position: ${exp.position || "N/A"}
  Company: ${exp.company || "N/A"}
  Duration: ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
  Description: ${exp.description || "N/A"}
`).join("\n")}

Education:
${educations?.map(edu => `
- Degree: ${edu.degree || "N/A"}
  School: ${edu.school || "N/A"}
  Duration: ${edu.startDate || "N/A"} to ${edu.endDate || "Present"}
  Marks: ${edu.marks || "N/A"}
`).join("\n")}

Skills: ${skills}
`;


    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
        config: {
            systemInstruction: systemMessage,
        },
    });
    const aiResponse = response.text;
    if (!aiResponse) throw new Error("Failed to generate summary");
    return aiResponse;
}