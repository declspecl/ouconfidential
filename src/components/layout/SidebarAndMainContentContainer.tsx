import { cn } from "@/lib/utils";
import { Sidebar } from "../pages/Sidebar";

interface SidebarAndMainContentContainerProps {
    className?: string,
    children: React.ReactNode
}

export function SidebarAndMainContentContainer({ className, children }: SidebarAndMainContentContainerProps) {
    return (
        <main className={cn("w-full h-full flex flex-row bg-base text-text overflow-hidden", className)}>
            <Sidebar />

            <div className="w-full h-full grow flex flex-row justify-center overflow-y-auto">
                <div className="mx-auto my-4 p-6 w-7/12 bg-surface border-opacity-20 rounded-xl overflow-y-auto">
                    {children}
                </div>
            </div>
        </main>
    );
}
