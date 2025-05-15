import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function Footer({ currentStep, setCurrentStep }: FooterProps) {
  const prevStep = steps.find(
    (_, idx) => steps[idx + 1]?.key === currentStep,
  )?.key;
  const nextStep = steps.find(
    (_, idx) => steps[idx - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              if (prevStep) {
                setCurrentStep(prevStep);
              }
            }}
            disabled={!prevStep}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (nextStep) {
                setCurrentStep(nextStep);
              }
            }}
            disabled={!nextStep}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
}
