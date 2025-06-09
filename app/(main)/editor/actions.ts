"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validations";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob"
import path from "path";

export async function saveResume(value: ResumeValues) {
    // for photo -> null = image deleted, undefined = no change, File = image
    const { id } = value;
    console.log("Resume Data == ", value);

    const { photo, workExperiences, educations, ...resumeValues } = resumeSchema.parse(value);

    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    //TODO: check resume count

    const existingResume = id ? await prisma.resume.findUnique({
        where: {
            id,
            userId
        }
    }) : null;

    if (id && !existingResume) {
        throw new Error("Resume not found");
    }


    let newPhotoUrl: string | undefined | null = undefined;

    if (photo instanceof File) {
        if (existingResume?.photoUrl) {
            del(existingResume.photoUrl)
        }

        const blob = await put(`resume_photos/${path.extname, (photo.name)}`, photo, {
            access: "public",
            addRandomSuffix:true
        })

        newPhotoUrl = blob.url;
    }
    else if (photo === null) {
        if (existingResume?.photoUrl) {
            del(existingResume.photoUrl)
        }
        newPhotoUrl = null;
    }
    if (id) {
        return await prisma.resume.update({
            where: {
                id
            },
            data: {
                ...resumeValues,
                photoUrl: newPhotoUrl,
                workExperiences: {
                    deleteMany: {}, // delete all existing work experiences
                    create: workExperiences?.map(exp => ({
                        ...exp,
                        startDate: exp.startDate ? new Date(exp.startDate) : null,
                        endDate: exp.endDate ? new Date(exp.endDate) : null
                    }))
                },
                educations: {
                    deleteMany: {}, // delete all existing work experiences
                    create: educations?.map(edu => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : null,
                        endDate: edu.endDate ? new Date(edu.endDate) : null
                    }))
                },
                updatedAt: new Date()
            }
        })
    } else {
        return await prisma.resume.create(
            {
                data: {
                    ...resumeValues,
                    userId,
                    photoUrl: newPhotoUrl,
                    workExperiences: {
                        create: workExperiences?.map(exp => ({
                            ...exp,
                            startDate: exp.startDate ? new Date(exp.startDate) : null,
                            endDate: exp.endDate ? new Date(exp.endDate) : null
                        }))
                    },
                    educations: {
                        create: workExperiences?.map(edu => ({
                            ...edu,
                            startDate: edu.startDate ? new Date(edu.startDate) : null,
                            endDate: edu.endDate ? new Date(edu.endDate) : null
                        }))
                    },
                }
            }
        )
    }

}