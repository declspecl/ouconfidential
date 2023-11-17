import { HomeIcon, SettingsIcon } from "lucide-react";
import { BoardsLoader } from "./Sidebar/BoardsLoader";

export default function Sidebar() {
    return (
        <ul className="p-3 w-20 h-full flex flex-col gap-4 justify-start items-center bg-background-100">
            <li className="w-full aspect-square rounded-full bg-background-200 p-2">
                <SettingsIcon className="w-full h-full stroke-text" />
            </li>

            <li className="w-full aspect-square rounded-full bg-background-200 p-2">
                <HomeIcon className="relative bottom-0.5 w-full h-full stroke-text" />
            </li>

            <BoardsLoader />
        </ul>
    )
}
