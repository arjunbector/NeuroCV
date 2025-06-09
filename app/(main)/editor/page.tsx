import { Metadata } from "next";
import ResumeEditor from "./resume-editor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { resumeDataInclude } from "@/lib/types";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Resume Editor",
};

export default async function EditorPage({ searchParams }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  const { resumeId } = await searchParams;
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId: userId },
        include: resumeDataInclude,
      })
    : null;

  return (
    <div className="flex h-full grow flex-col">
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </div>
  );
}
