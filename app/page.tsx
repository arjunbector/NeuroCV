import Link from "next/link";
import HeroSection from "./hero-section";
import HowItWorks from "./how-it-works";


export default function Home() {
  return (
   <main className="dark:bg-neutral-900">
    <HeroSection/>
    <HowItWorks/>
   </main>
  );
}
