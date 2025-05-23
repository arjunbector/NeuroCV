import ResumePreview from "@/components/resume-preview";
import { ResumeValues } from "@/lib/validations";
import ColorPicker from "./color-picker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="relative hidden w-1/2 md:flex">
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 lg:pt-3 lg:pl-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) => {
            setResumeData({
              ...resumeData,
              colorHex: color.hex,
            });
          }}
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto p-3">
        <ResumePreview
          className="max-w-2xl shadow-md"
          resumeData={resumeData}
        />
      </div>
    </div>
  );
}
