import { createClient } from "@/backend/utils";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";

export default function Home() {
    return (
        <main className="bg-background">
            <Sidebar />

            <button onClick={async () => {
                "use server";

                const supabase = createClient(cookies());
                const {data, error } = await supabase.auth.signOut();

                console.error(error);
            }}>
                sign out
            </button>
        </main>
    );
}
