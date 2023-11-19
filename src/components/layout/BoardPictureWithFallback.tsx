"use client";

import Image from "next/image";
import { Skeleton } from "../ui/Skeleton";
import * as Avatar from "@radix-ui/react-avatar";

interface BoardPictureWithFallbackProps {
    name: string,
    pictureURL: string,
    sizesQuery: string,
    className: string
}

export function BoardPictureWithFallback({ name, pictureURL, sizesQuery, className }: BoardPictureWithFallbackProps) {
    return (
        <Avatar.Root className={className}>
            <Avatar.Image
                className="relative w-full aspect-square object-cover object-center rounded-full"
                src={pictureURL}
                alt={name}
                asChild
            >
                <div className="relative w-full aspect-square inline-block">
                    <Image
                        src={pictureURL}
                        alt={name}
                        fill
                        sizes={sizesQuery}
                        className="object-cover object-center rounded-full"
                    />
                </div>
            </Avatar.Image>

            <Avatar.Fallback className="inline-block w-full aspect-square rounded-full">
                <Skeleton className="w-full h-full rounded-full" />
            </Avatar.Fallback>
        </Avatar.Root>
    )
}
