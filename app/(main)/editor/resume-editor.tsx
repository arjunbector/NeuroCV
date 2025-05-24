"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeneralInfoForm from "./forms/general-info-form";
import PersonalInfoForm from "./forms/personal-info-form";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./bread-crumbs";
import Footer from "./footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validations";
import ResumePreviewSection from "./resume-preview-section";
import { cn } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>({});
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  
  const currentStep = searchParams.get("step") || steps[0].key;
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }
  
  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  
  return (
    <div className="flex h-full grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume, your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative h-full flex-1 grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            className={cn(showSmResumePreview && "flex")}
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        setShowSmResumePreview={setShowSmResumePreview}
        showSmResumePreview={showSmResumePreview}
      />
    </div>
  );
}
