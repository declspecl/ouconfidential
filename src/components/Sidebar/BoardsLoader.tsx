import { cookies } from "next/headers";
import { BoardIcon } from "./BoardIcon";
import { AlertCircleIcon } from "lucide-react";
import { Database } from "@/backend/database.types";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function BoardsLoader() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });
    
    const { data: { user: user }, error: authError } = await supabase.auth.getUser();

    let errorEncountered: AuthError | PostgrestError | null = null;
    let boards: Database["public"]["Tables"]["boards"]["Row"][] = [];

    if (user) {
        const { data: joinedBoards, error: boardsUsersError } = await supabase.from("boards_users")
            .select("*")
            .eq("user_uuid", user.id);

        if (joinedBoards) {
            const { data: matchingBoards, error: boardsError } = await supabase.from("boards")
                .select("*")
                .in("board_id", joinedBoards.map(board => board.board_id));

            if (boardsError) {
                console.error(boardsError);

                errorEncountered = boardsError;
            }
            else {
                boards = matchingBoards;
            }
        }
        else {
            console.error(boardsUsersError);

            errorEncountered = boardsUsersError;
        }
    }
    else {
        console.log(authError);

        errorEncountered = authError;
    }

    return (
        <>
            {errorEncountered ? (
                <li className="p-2 bg-background-200 rounded-full">
                    <AlertCircleIcon className="aspect-square rounded-full" />
                </li>
            ) : (
                <>
                    {boards.map(board => (
                        <BoardIcon src={board.picture_url} target={board.name} alt={board.name} key={board.name} />
                    ))}
                </>
            )}
        </>
    );
}
