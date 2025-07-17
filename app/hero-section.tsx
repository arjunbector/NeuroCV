import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import animationData from "@/public/hero-animation.json";
import AnimatedJson from "@/components/animated-json";

export default function HeroSection() {
  return (
    <MaxWidthWrapper className="flex flex-col-reverse items-center justify-center sm:flex-row py-10 sm:min-h-screen">
      <div className="flex flex-col gap-3 md:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold sm:text-left text-center">
          Build a Job-Winning <span className="text-[#00ddb3]">Resume</span> in
          Minutes - Powered by AI
        </h1>
        <h3 className="text-muted-foreground text-center sm:text-left px-10 sm:px-0">
          Let AI craft your perfect resume. No writing stress. No templates.
          Just professional results.
        </h3>
        <div className="flex items-center justify-center sm:justify-start">
          <Button size="lg" asChild>
            <Link href="/resumes">Get your Resume</Link>
          </Button>
        </div>
      </div>
      <div className="flex h-full w-1/2 items-center justify-end">
        <>
          <AnimatedJson
            autoplay
            jsonData={animationData}
            height={500}
            width={500}
            className="hidden md:block"
          />
          <AnimatedJson
            autoplay
            jsonData={animationData}
            height={250}
            width={250}
            className="md:hidden"
          />
        </>
      </div>
    </MaxWidthWrapper>
  );
}
