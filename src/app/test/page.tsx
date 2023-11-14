import { createClient } from "@/backend/utils";
import { cookies } from "next/headers";

export default async function Test() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: users } = await supabase.from("boards").select();

    return (
        <div className="flex flex-col">
            {JSON.stringify(users, null, 2)}
        </div>
    );
}
