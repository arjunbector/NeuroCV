import ResumePreview from "@/components/resume-preview";
import { ResumeValues } from "@/lib/validations";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview className="max-w-2xl shadow-md" resumeData={resumeData} />
      </div>
    </div>
  );
}
