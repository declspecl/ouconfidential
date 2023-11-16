import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
    const supabase = createServerComponentClient({ cookies: () => cookies() });

    const { data } = supabase.storage.from("board-profile-pictures").getPublicUrl("ou-logo.png");

    return (
        <main className="bg-background">
            <Sidebar />

            <SignOutButton />
        </main>
    );
}
