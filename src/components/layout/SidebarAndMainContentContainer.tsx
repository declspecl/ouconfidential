import { cn } from "@/lib/utils";
import { Sidebar } from "../pages/Sidebar";

interface SidebarAndMainContentContainerProps {
    className?: string,
    children: React.ReactNode
}

export function SidebarAndMainContentContainer({ className, children }: SidebarAndMainContentContainerProps) {
    return (
        <main className={cn(
            "w-full h-full flex flex-row text-text bg-rp-base drop-shadow-lg overflow-hidden",
            className
        )}>
            <Sidebar />

            <div className="w-full h-full grow flex flex-row justify-center overflow-y-auto">
                <div className={cn(
                    "mx-auto my-5 p-9 w-11/12 bg-surface border border-muted border-opacity-25 rounded-xl overflow-y-auto",
                    "xl:w-8/12"
                )}>
                    {children}
                </div>
            </div>
        </main>
    );
}
