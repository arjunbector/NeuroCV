import { Button } from "@/components/ui/button";
import { CircleIcon, SquareIcon, SquircleIcon } from "lucide-react";

export const BORDER_STYLES = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BORDER_STYLES);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}
export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  const handleClick = () => {
    const currentIdx = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIdx = (currentIdx + 1) % borderStyles.length;
    onChange(borderStyles[nextIdx]);
  };

  const Icon =
    borderStyle === "square"
      ? SquareIcon
      : borderStyle === "circle"
        ? CircleIcon
        : SquircleIcon;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon className="size-5"/>
    </Button>
  );
}
