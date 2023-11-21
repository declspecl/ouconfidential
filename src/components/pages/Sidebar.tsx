import Link from "next/link";
import { Tooltip } from "../ui/Tooltip";
import { BoardsLoader } from "./Sidebar/BoardsLoader";
import { Separator } from "@/components/ui/Separator";
import { GlobeIcon, HomeIcon, UserCircle2Icon } from "lucide-react";

function ManualSidebarEntry({ children }: { children: React.ReactNode }) {
    return (
        <li className="w-full aspect-square bg-overlay rounded-full">
            {children}
        </li>
    );
}

export function Sidebar() {
    return (
        <div className="w-20 h-full scrollable-hidden bg-surface">
            <ul className="p-2.5 w-full h-full flex flex-col gap-3 items-center">
                <Tooltip content="Account" side="right">
                    <ManualSidebarEntry>
                        <Link href="/account">
                            <UserCircle2Icon className="p-3 w-full h-full stroke-text" />
                        </Link>
                    </ManualSidebarEntry>
                </Tooltip>

                <Tooltip content="Home" side="right">
                    <ManualSidebarEntry>
                        <Link href="/">
                            <HomeIcon className="p-3 w-full h-full stroke-text" />
                        </Link>
                    </ManualSidebarEntry>
                </Tooltip>

                <Tooltip content="Boards" side="right">
                    <ManualSidebarEntry>
                        <Link href="/ou">
                            <GlobeIcon className="p-3 w-full h-full stroke-text" />
                        </Link>
                    </ManualSidebarEntry>
                </Tooltip>

                <Separator orientation="horizontal" className="mw-auto w-[85%] h-[2px] bg-subtle rounded-full" />

                <BoardsLoader />
            </ul>
        </div>
    );
}
