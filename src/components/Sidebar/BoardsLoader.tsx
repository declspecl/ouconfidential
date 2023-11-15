import { createClient } from "@/backend/utils";
import { cookies } from "next/headers";

export default async function BoardsLoader() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
    }

    let boards = [];

    if (sessionData.session) {
        const { data } = await supabase.from("boards").select("*").eq("creator_uuid", sessionData.session.user.id);

        boards = data || [];
    }

    return (
        <div className="flex flex-col">
            <p>yo</p>
            {boards}
        </div>
    );
}
