"use client";

import { cn } from "@/lib/utils";
import { signOut } from "@/actions/account";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
    className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
    const router = useRouter();

    return (
        <button
            className={cn(
                "px-4 py-1.5 text-rp-base bg-rose rounded-md",
                className
            )}
            onClick={() => {
                signOut();

                router.push("/");
                router.refresh();
            }}
        >
            Sign out
        </button>
    );
}
