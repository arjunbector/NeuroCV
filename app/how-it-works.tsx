import AnimatedJson from "@/components/animated-json";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import animationData1 from "@/public/hiw1.json";
import animationData2 from "@/public/hiw2.json";
import animationData3 from "@/public/hiw3.json";

interface CardProps {
  title: string;
  description: string;
  AnimationData: unknown;
}

const STEPS: CardProps[] = [
  {
    title: "Share Your Info",
    description:
      "Just answer a few simple questions — education, experience, skills.",
    AnimationData: animationData1,
  },
  {
    title: "Let AI Work Its Magic",
    description:
      "Our advanced AI writes tailored summaries, experience descriptions, and achievements that match your goals.",
    AnimationData: animationData3,
  },
  {
    title: "Download or Print Your Resume",
    description:
      "Get a polished, professional resume ready for job applications. Download it as a PDF or print it directly.",
    AnimationData: animationData2,
  },
];

export default function HowItWorks() {
  return (
    <MaxWidthWrapper className="py-10">
      <h1 className="mb-10 text-center text-5xl font-bold">How it works?</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <Card {...step} key={step.title} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

function Card({ title, description, AnimationData }: CardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4 dark:bg-neutral-800">
      <div className="flex h-48 w-full items-center justify-center">
        <AnimatedJson
          jsonData={AnimationData}
          autoplay
          height={150}
          width={150}
        />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
