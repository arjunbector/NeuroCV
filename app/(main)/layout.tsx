import PremiumModal from "@/components/premium/premium-modal";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PremiumModal />
      {children}
    </div>
  );
}
