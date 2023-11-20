"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

interface SeparatorProps {
    orientation: "horizontal" | "vertical",
    className?: string
}

export function Separator({ orientation, className }: SeparatorProps) {
    return (
        <SeparatorPrimitive.Root orientation={orientation} className={className} />
    );
}
