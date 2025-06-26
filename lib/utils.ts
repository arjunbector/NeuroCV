import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ResumeServerData } from "./types"
import { ResumeValues } from "./validations"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    email: data.email || undefined,
    phone: data.phone || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    workExperiences: data.workExperiences.map(exp => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    educations: data.educations.map(edu => ({
      school: edu.school || undefined,
      degree: edu.degree || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    projects: data.projects.map(project => ({
      title: project.title || undefined,
      link: project.link || undefined,
      startDate: project.startDate?.toISOString().split("T")[0],
      endDate: project.endDate?.toISOString().split("T")[0],
      description: project.description || undefined,
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,

  }
}