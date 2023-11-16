import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
    const supabase = createServerComponentClient({ cookies: () => cookies() });

    const { data, error } = await supabase.storage.from("board-profile-pictures").getPublicUrl("ou-logo.png");

    if (error) {
        console.log(error);
    }

    return (
        <main className="bg-background">
            <Sidebar />

            <div>
                {data && <img src={data.publicUrl} alt="logo" />}
            </div>

            <SignOutButton />
        </main>
    );
}
