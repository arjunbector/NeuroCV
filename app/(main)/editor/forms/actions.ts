"use server";

import { gemini } from "@/lib/gemini";
import { GenerateSummaryInput, generateSummarySchema, GenerateWorkExperienceInput, generateWorkExperienceSchema, WorkExperience } from "@/lib/validations";

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


export async function generateWorkExperience(
    input: GenerateWorkExperienceInput
) {
    const { description } = generateWorkExperienceSchema.parse(input);
    const systemMessage = `
    You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input. Your response must adhere to the following format. You can omit fields if they can't be inferred from the provided data, but don't add any new fields.

    Job title: <jobTitle>
    Company: <companyName>
    Start date: <format: YYYY-MM-DD> (only if provided)
    End date: <format: YYYY-MM-DD> (only if provided)
    Description: <an optimized description in bullet format('•' as bullet markers), might be inferred from the job title>
    `
    const userMessage = `
    Please provide a work experience entry based on the following description:
    ${description}
    `
    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
        config: {
            systemInstruction: systemMessage,
        },
    });
    const aiResponse = response.text;
    if (!aiResponse) throw new Error("Failed to generate summary");


    // Extract details using regex
    const position = aiResponse.match(/Job title:\s*(.*)/i)?.[1]?.trim() || "";
    const company = aiResponse.match(/Company:\s*(.*)/i)?.[1]?.trim() || "";
    const startDate = aiResponse.match(/Start date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/i)?.[1] || "";
    const endDate = aiResponse.match(/End date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/i)?.[1] || "";
    // Description: everything after "Description:" (could be multiline)
    const descriptionMatch = aiResponse.match(/Description:\s*([\s\S]*)/i);
    const parsedDescription = descriptionMatch ? descriptionMatch[1].trim() : "";

    return {
        position,
        company,
        description: parsedDescription,
        startDate,
        endDate,
    } satisfies WorkExperience;
}