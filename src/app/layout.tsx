import "./main.css"

import React from "react"
import { inter } from "@/Fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next"
import { SidebarAndMainContentContainer } from "@/components/layout/SidebarAndMainContentContainer";

export const metadata: Metadata = {
    title: "OU Confidential",
    description: "OU Confidential",
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="w-full h-full">
            <body className={cn("w-full h-full bg-rp-base", inter.className)}>
                <SidebarAndMainContentContainer>
                    {children}
                </SidebarAndMainContentContainer>
            </body>
        </html>
    );
}
