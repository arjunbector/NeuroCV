"use client";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";

interface AnimatedJsonProps {
  loop?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  jsonData: unknown;
}
export default function AnimatedJson({
  autoplay,
  className,
  height,
  loop,
  width,
  jsonData,
}: AnimatedJsonProps) {
  return (
    <div style={{ width, height }} className={cn(className)}>
      <Lottie animationData={jsonData} loop={loop} autoplay={autoplay} />
    </div>
  );
}
