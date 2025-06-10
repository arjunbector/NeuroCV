"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";

const PREMIUM_FEATURES = ["AI Tools", "Upto 3 resumes"];
const PREMIUM_PLUS_FEATURES = ["Infinite Resumes", "Design Customization"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resume Builder AI Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {PREMIUM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button>Get Premium</Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium+
              </h3>
              <ul className="list-inside space-y-2">
                {PREMIUM_PLUS_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="premium">Get Premium+</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
