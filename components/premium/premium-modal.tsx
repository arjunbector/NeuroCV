"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePremiumModal from "@/hooks/usePremiumModal";
import { SubscriptionAmount } from "@/lib/types";
import { CheckIcon } from "lucide-react";
import Script from "next/script";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { createPremiumSubscription, verifyOrder } from "./actions";

const PREMIUM_FEATURES = ["AI Tools", "Upto 3 resumes"];
const PREMIUM_PLUS_FEATURES = ["Infinite Resumes", "Design Customization"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const createOrder = async (amount: SubscriptionAmount) => {
    const data = await createPremiumSubscription(amount);
    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,
      handler: async (res: any) => {
        // verify payment
        const { success } = await verifyOrder(
          res.razorpay_order_id,
          res.razorpay_payment_id,
          res.razorpay_signature,
        );
        if (success) {
          toast.success("Subscription activated successfully!");
          window.location.reload();
        }
      },
    };
    setOpen(false);
    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
                <Button
                variant="secondary"
                  onClick={() => {
                    createOrder(500);
                  }}
                >
                  Get Premium
                </Button>
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
                <Button
                  variant="default"
                  onClick={() => {
                    createOrder(1000);
                  }}
                >
                  Get Premium+
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
