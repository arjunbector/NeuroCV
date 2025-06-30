import animationData1 from "@/public/hiw1.json";
import AnimatedJson from "@/components/animated-json";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <AnimatedJson
          jsonData={animationData1}
          autoplay
          height={400}
          width={400}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-[#00ddb3]">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
