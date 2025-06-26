"use server";

import { canCreateResume, canUseCustomization } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getPlanDetails } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validations";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob"
import path from "path";

export async function saveResume(value: ResumeValues) {
    // for photo -> null = image deleted, undefined = no change, File = image
    const { id } = value;

    const { photo, workExperiences, educations, ...resumeValues } = resumeSchema.parse(value);

    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const subscriptionLevel = await getPlanDetails();
    if (!id) {
        const totalResumeCount = await prisma.resume.count({
            where: {
                userId
            }
        });
        if (!canCreateResume(subscriptionLevel, totalResumeCount)) {
            throw new Error("You have reached the maximum number of resumes allowed for your subscription level.");
        }
    }

    const existingResume = id ? await prisma.resume.findUnique({
        where: {
            id,
            userId
        }
    }) : null;

    if (id && !existingResume) {
        throw new Error("Resume not found");
    }

    const hasCustomizations = (resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle) ||
        (resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex)

    if (hasCustomizations && !canUseCustomization(subscriptionLevel)) {
        throw new Error("You need a premium subscription to use customizations.");
    }


    let newPhotoUrl: string | undefined | null = undefined;

    if (photo instanceof File) {
        if (existingResume?.photoUrl) {
            del(existingResume.photoUrl)
        }

        const blob = await put(`resume_photos/${path.extname, (photo.name)}`, photo, {
            access: "public",
            addRandomSuffix: true
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
                projects: {
                    deleteMany: {}, // delete all existing projects
                    create: value.projects?.map(project => ({
                        ...project,
                        startDate: project.startDate ? new Date(project.startDate) : null,
                        endDate: project.endDate ? new Date(project.endDate) : null
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
                        create: educations?.map(edu => ({
                            ...edu,
                            startDate: edu.startDate ? new Date(edu.startDate) : null,
                            endDate: edu.endDate ? new Date(edu.endDate) : null
                        }))
                    },
                    projects: {
                        create: value.projects?.map(project => ({
                            ...project,
                            startDate: project.startDate ? new Date(project.startDate) : null,
                            endDate: project.endDate ? new Date(project.endDate) : null
                        }))
                    }
                }
            }
        )
    }

}