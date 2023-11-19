import Link from "next/link";
import { BoardPictureWithFallback } from "@/components/layout/BoardPictureWithFallback";

interface BoardPictureProps {
    src: string,
    name: string,
    target: string,
}

export function BoardPicture({ src, name, target }: BoardPictureProps) {
    return (
        <li className="w-full aspect-square">
            <Link href={`/ou/${target}`} className="w-full aspect-square">
                <BoardPictureWithFallback pictureURL={src} name={name} sizesQuery="6rem" className="w-full aspect-square" />
            </Link>
        </li>
    );
}
