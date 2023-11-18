import Link from "next/link";

interface BoardIconProps {
    src: string,
    target: string,
    alt: string
}

export function BoardIcon({ src, target, alt }: BoardIconProps) {
    return (
        <li>
            <Link href={`/ou/${target}`}>
                <img className="w-full aspect-square object-cover object-center rounded-full" src={src} alt={alt} />
            </Link>
        </li>
    );
}
