import { cn } from "@/lib/utils";
import { poppins } from "@/Fonts";
import { BoardPictureWithFallback } from "./BoardPictureWithFallback";

interface BoardInfoHeaderProps {
    name: string,
    description: string,
    pictureURL: string,
    createdAt?: Date
}

export function BoardInfoHeader({ name, description, pictureURL, createdAt }: BoardInfoHeaderProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <BoardPictureWithFallback name={name} pictureURL={pictureURL} sizesQuery="7rem" className="w-28 h-28 aspect-square" />

                <div className="flex flex-col justify-end -translate-y-[6.25%]">
                    {/*<h3 className={cn("", poppins.className)}>{name}</h3> */}
                    <h3 className={cn("", poppins.className)}>{name.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}</h3>

                    {createdAt && (
                        <p className="text-text text-opacity-75">Created {createdAt.toLocaleString()}</p>
                    )}
                </div>
            </div>

            <p>{description}</p>
        </div>
    );
}
