import PremiumModal from "@/components/premium/premium-modal";
import { getPlanDetails } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import Navbar from "./navbar";
import {
  SubscriptionLevelProvider
} from "./subscription-level-provider";

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
