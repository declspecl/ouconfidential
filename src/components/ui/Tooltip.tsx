"use client";

import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
    content: string,
    children: React.ReactNode,
    side: "top" | "right" | "bottom" | "left"
}

export function Tooltip({ content, children, side }: TooltipProps) {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root delayDuration={450}>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        className={cn(
                            "px-3 py-2 bg-rose text-rp-base rounded-md drop-shadow-xl",
                            "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
                        )}
                        sideOffset={5}
                        side={side}
                    >
                        {content}

                        <TooltipPrimitive.Arrow className="fill-rose" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
