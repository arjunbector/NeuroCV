import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validations";
import { useEffect, useState } from "react";

export default function useAutoSave(resumeData: ResumeValues) {
    const debaouncedResumeData = useDebounce(resumeData, 1500);

    const [lastSavedData, setLastSavedData] = useState<ResumeValues>(
        structuredClone(resumeData),
    );
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function save() {
            setIsSaving(true)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setLastSavedData(structuredClone(debaouncedResumeData))
            setIsSaving(false)
        }
        const hasUnsavedChanges = JSON.stringify(debaouncedResumeData) !== JSON.stringify(lastSavedData)
        if (hasUnsavedChanges && debaouncedResumeData && !isSaving) {
            save()
        }
    }, [debaouncedResumeData, isSaving]);

    return { isSaving, hasUnsavedChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSavedData) }
}