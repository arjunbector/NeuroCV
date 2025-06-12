import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "./create-resume-button";
import ResumeItem from "./resume-item";
import { getPlanDetails } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permissions";
import { StickyNoteIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "My Resumes",
};

export default async function ResumePage() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [resumes, count, userSubscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId: userId,
      },
    }),
    getPlanDetails(),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton
        canCreate={canCreateResume(userSubscriptionLevel, count)}
      />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <p>Total: {count}</p>
      </div>
      {resumes.length > 0 ? (
        <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 rounded-lg border border-dashed border-gray-400 p-6 text-center dark:border-gray-700">
          <StickyNoteIcon />
          <p>No Resumes found</p>
        </div>
      )}
    </main>
  );
}
