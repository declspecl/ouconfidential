import Link from "next/link";
import { GlobeIcon, HomeIcon, SettingsIcon } from "lucide-react";
import { BoardsLoader } from "./Sidebar/BoardsLoader";

function ManualSidebarEntry({ children }: { children: React.ReactNode }) {
    return (
        <li className="p-2.5 w-full aspect-square bg-overlay rounded-full">
            {children}
        </li>
    );
}

export function Sidebar() {
    return (
        <div className="w-20 h-full scrollable-hidden bg-surface">
            <ul className="p-2 w-full h-full flex flex-col gap-4 items-center">
                <ManualSidebarEntry>
                    <Link href="/">
                        <HomeIcon className="w-full h-full stroke-text" />
                    </Link>
                </ManualSidebarEntry>

                {/*
                <ManualSidebarEntry>
                    <Link href="/">
                        <SettingsIcon className="w-full h-full stroke-text" />
                    </Link>
                </ManualSidebarEntry>
                */}

                <ManualSidebarEntry>
                    <Link href="/ou">
                        <GlobeIcon className="w-full h-full stroke-text" />
                    </Link>
                </ManualSidebarEntry>

                <BoardsLoader />
            </ul>
        </div>
    );
}
