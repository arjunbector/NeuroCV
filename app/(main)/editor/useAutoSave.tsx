import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validations";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function useAutoSave(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const debaouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSavedData, setLastSavedData] = useState<ResumeValues>(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debaouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
        const newData = structuredClone(debaouncedResumeData);
        const updatedResume = await saveResume({
          id: resumeId,
          ...newData,
          ...(lastSavedData.photo?.toString() === newData.photo?.toString() && {
            photo: undefined,
          }),
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.log("Error saving resume:", error);
        toast(
          <div className="space-y-3">
            <p>Could not save changes</p>
            <Button
              onClick={() => {
                toast.dismiss();
                save(); // Retry only when the user clicks "Retry"
              }}
              variant="secondary"
            >
              Retry
            </Button>
          </div>,
        );
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debaouncedResumeData) !== JSON.stringify(lastSavedData);

    // Only attempt to save if there are unsaved changes, no ongoing save, and no error
    if (hasUnsavedChanges && debaouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debaouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
