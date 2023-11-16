"use client";

import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <button onClick={async () => {
            console.log("yo");
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error(error);
            }

            router.refresh();
        }}>
            sign out
        </button>
    );
}
