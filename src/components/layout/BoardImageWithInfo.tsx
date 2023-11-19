import Image from "next/image";
import { cn } from "@/lib/utils";
import { poppins } from "@/Fonts";

interface BoardImageWithInfoProps {
    name: string,
    description: string,
    pictureURL: string,
    createdAt?: Date
}

export function BoardImageWithInfo({ name, description, pictureURL, createdAt }: BoardImageWithInfoProps) {
    return (
        <div className="flex flex-row gap-2">
            <div className="relative w-28 h-28 aspect-square inline-block">
                <Image
                    src={pictureURL}
                    alt={name}
                    fill
                    sizes="6rem"
                    className="object-cover object-center border border-muted border-opacity-25 rounded-full"
                />
            </div>

            <div className="flex flex-col justify-end -translate-y-[6.25%]">
                <h3 className={cn("", poppins.className)}>{name}</h3>

                {createdAt && (
                    <p className="text-text text-opacity-75">Created {createdAt.toLocaleString()}</p>
                )}
            </div>
        </div>
    );
}
