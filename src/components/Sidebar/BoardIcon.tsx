"use client";

import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { Skeleton } from "../Skeleton";

interface BoardIconProps {
    src: string,
    target: string,
    alt: string
}

export function BoardIcon({ src, target, alt }: BoardIconProps) {
    return (
        <li className="w-full aspect-square">
            <Link href={`/ou/${target}`} className="w-full aspect-square">
                <Avatar.Root className="w-full aspect-square">
                    <Avatar.Image
                        className="w-full aspect-square object-cover object-center rounded-full"
                        src={src}
                        alt={alt}
                    />

                    <Avatar.Fallback className="inline-block w-full aspect-square rounded-full">
                        <Skeleton className="w-full h-full rounded-full" />
                    </Avatar.Fallback>
                </Avatar.Root>
            </Link>
        </li>
    );
}
