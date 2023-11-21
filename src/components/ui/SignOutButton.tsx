"use client";

import { signOut } from "@/actions/account";
import { Database } from "@/backend/database.types";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SignOutButtonProps {
    className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
    const supabase = createClientComponentClient<Database>();

    return (
        <button
            className={cn(
                "px-4 py-2 text-rp-base bg-rose rounded-md",
                className
            )}
            onClick={() => signOut()}
        >
            Sign out
        </button>
    );
}
