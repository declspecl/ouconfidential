import { poppins } from "@/Fonts";
import { cn, prettifyBoardName } from "@/lib/utils";
import { BoardPictureWithFallback } from "./BoardPictureWithFallback";

interface BoardInfoHeaderProps {
    name: string,
    description: string,
    pictureURL: string,
    createdAt?: Date
}

export function BoardInfoHeader({ name, description, pictureURL, createdAt }: BoardInfoHeaderProps) {
    return (
        <div className="w-fit flex flex-col gap-3">
            <div className="w-fit flex flex-row gap-3">
                <BoardPictureWithFallback name={name} pictureURL={pictureURL} sizesQuery="7rem" className="w-28 h-28 aspect-square" />

                <div className="flex flex-col justify-end -translate-y-[6.25%]">
                    <h3 className={cn("", poppins.className)}>{prettifyBoardName(name)}</h3>

                    {createdAt && (
                        <p className="text-text text-opacity-75">Created {createdAt.toLocaleString()}</p>
                    )}
                </div>
            </div>

            <p className="text-lg">{description}</p>
        </div>
    );
}
