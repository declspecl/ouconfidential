"use client";

import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function SignOutButton() {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <button className="px-2 py-1 bg-slate-500 text-white border border-slate-600 rounded-md" onClick={async () => {
            const { error } = await supabase.auth.signOut();

            if (error)
                console.error(error);

            router.refresh();
        }}>
            Sign out
        </button>
    );
}
