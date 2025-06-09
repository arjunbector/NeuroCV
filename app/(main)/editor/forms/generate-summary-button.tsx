import LoadingButton from "@/components/loading-button";
import { ResumeValues } from "@/lib/validations";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
export default function GenerateSummaryButton({
  onSummaryGenerated,
  resumeData,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while generating the summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      variant="outline"
      type="button"
      loading={loading}
      onClick={handleClick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
