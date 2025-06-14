import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import animationData from "@/public/hero-animation.json";
import AnimatedJson from "@/components/animated-json";

export default function HeroSection() {
  return (
    <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
      <div className="w-1/2 flex flex-col gap-3">
        <h1 className="text-5xl font-bold">
          Build a Job-Winning <span className="text-[#00ddb3]">Resume</span> in
          Minutes - Powered by AI
        </h1>
        <h3 className="text-muted-foreground">
          Let AI craft your perfect resume. No writing stress. No templates.
          Just professional results.
        </h3>
        <div>
          <Button size="lg" asChild>
            <Link href="/resumes">Get your Resume</Link>
          </Button>
        </div>
      </div>
      <div className="flex h-full w-1/2 items-center justify-end">
        <AnimatedJson
          autoplay
          jsonData={animationData}
          height={500}
          width={500}
        />
      </div>
    </MaxWidthWrapper>
  );
}
