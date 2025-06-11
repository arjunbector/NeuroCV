import PremiumModal from "@/components/premium/premium-modal";
import Navbar from "./navbar";
import { auth } from "@clerk/nextjs/server";
import { useContext } from "react";
import {
  SubscriptionLevelProvider,
  useSubscriptionLevel,
} from "./subscription-level-provider";
import { getPlanDetails } from "@/lib/subscription";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const userSubscriptionLevel = await getPlanDetails();
  return (
    <SubscriptionLevelProvider
      userSubscriptionLevel={userSubscriptionLevel}
    >
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PremiumModal />
        {children}
      </div>
    </SubscriptionLevelProvider>
  );
}
