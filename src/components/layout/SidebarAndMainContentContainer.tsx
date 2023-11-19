import { cn } from "@/lib/utils";
import { Sidebar } from "../pages/Sidebar";

interface SidebarAndMainContentContainerProps {
    className?: string,
    children: React.ReactNode
}

export function SidebarAndMainContentContainer({ className, children }: SidebarAndMainContentContainerProps) {
    return (
        <main className={cn("w-full h-full flex flex-row bg-gradient-to-tr from-base to-highlight-low text-text overflow-hidden", className)}>
            <Sidebar />

            <div className="w-full h-full grow flex flex-row justify-center overflow-y-auto">
                <div className={cn(
                    "mx-auto my-4 p-6 w-11/12 bg-surface border border-muted border-opacity-20 rounded-xl overflow-y-auto",
                    "xl:w-8/12"
                )}>
                    {children}
                </div>
            </div>
        </main>
    );
}
