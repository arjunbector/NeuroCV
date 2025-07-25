import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { useSubscriptionLevel } from "../subscription-level-provider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseCustomization } from "@/lib/permissions";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}
export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          title="Change resume color"
          onClick={() => {
            if (!canUseCustomization(subscriptionLevel)) {
              premiumModal.setOpen(true);
              return;
            }
            setShowPopover(true);
          }}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker onChange={onChange} color={color} triangle="top-right" />
      </PopoverContent>
    </Popover>
  );
}
