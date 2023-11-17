import { cookies } from "next/headers";
import { AlertCircleIcon } from "lucide-react";
import { Database } from "@/backend/database.types";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../Skeleton";

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
                <li className="p-2 w-20 h-20 rounded-full">
                    <AlertCircleIcon />
                </li>
            ) : (
                <>
                    {boards.map(board => (
                        <li className="p-2 w-20 h-20" key={board.name}>
                            <Link href={`/ou/${board.name}`} className="rounded-full">
                                <Suspense fallback={<Skeleton className="p-2 w-20 h-20 rounded-full" />}>
                                    <img className="w-full h-full object-cover rounded-full" src={board.picture_url} alt={board.name} />
                                </Suspense>
                            </Link>
                        </li>
                    ))}
                </>
            )}
        </>
    );
}
