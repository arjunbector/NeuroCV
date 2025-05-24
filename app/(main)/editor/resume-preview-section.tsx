import ResumePreview from "@/components/resume-preview";
import { ResumeValues } from "@/lib/validations";
import ColorPicker from "./color-picker";
import BorderStyleButton from "./border-style-button";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (resumeData: ResumeValues) => void;
  className?: string;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-10 transition-opacity group-hover:opacity-100 lg:pt-3 lg:pl-3 2xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) => {
            setResumeData({
              ...resumeData,
              colorHex: color.hex,
            });
          }}
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(newBorderStyle) => {
            setResumeData({
              ...resumeData,
              borderStyle: newBorderStyle,
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
