import Link from "next/link";
import { HomeIcon, SettingsIcon } from "lucide-react";
import { BoardsLoader } from "./Sidebar/BoardsLoader";

export default function Sidebar() {
    return (
        <div className="w-20 h-full scrollable-hidden">
            <ul className="p-2 w-full h-full flex flex-col gap-4 items-center bg-background-100">
                <li className="p-2.5 w-full aspect-square bg-background-200 rounded-full">
                    <Link href="/">
                        <SettingsIcon className="w-full h-full stroke-text" />
                    </Link>
                </li>

                <li className="p-2.5 w-full aspect-square bg-background-200 rounded-full">
                    <Link href="/">
                        <HomeIcon className="w-full h-full stroke-text" />
                    </Link>
                </li>

                <BoardsLoader />
            </ul>
        </div>
    );
}
