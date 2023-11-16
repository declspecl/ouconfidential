import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function BoardsLoader() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });
    
    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error) {
        return <p>{JSON.stringify(error, null, 2)}</p>
    }
    else {
        if (user) {
            const { data: joinedBoards, error } = await supabase.from("boards_users")
                .select("*")
                .eq("user_uuid", user.id);

            if (error) {
                return <p>{JSON.stringify(error, null, 2)}</p>
            }
            else {
                const { data: boards, error } = await supabase.from("boards")
                    .select("*")
                    .in("board_id", joinedBoards.map(board => board.board_id));

                if (error) {
                    return <p>{JSON.stringify(error, null, 2)}</p>
                }
                else {
                    return (
                        <ul>
                            {boards.map(board => <li key={board.board_id}>{board.name}</li>)}
                        </ul>
                    );
                }
            }
        }
        else {
            return <p>?</p>
        }
    }
}
