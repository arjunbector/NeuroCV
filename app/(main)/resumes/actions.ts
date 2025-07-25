"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(resumeId: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const resume = await prisma.resume.findUnique({
        where: { id: resumeId, userId: userId },
    })
    if (!resume) {
        throw new Error("Resume not found");
    }

    if (resume.photoUrl) {
        await del(resume.photoUrl);
    }
    await prisma.resume.delete({
        where: { id: resumeId },
    });
    revalidatePath("/resumes");
}