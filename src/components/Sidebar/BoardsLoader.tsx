import { cookies } from "next/headers";
import { AlertCircleIcon } from "lucide-react";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { BoardsContainer } from "./BoardsContainer";

export default async function BoardsLoader() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });
    
    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error(error);

        return (
            <BoardsContainer>
                <li>
                    <AlertCircleIcon />
                </li>
            </BoardsContainer>
        );
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
                    <BoardsContainer>
                        <li>
                            <AlertCircleIcon />
                        </li>
                    </BoardsContainer>
                }
                else {
                    return (
                        <BoardsContainer>
                            {boards.map(board => (
                                <li
                                    key={board.board_id}
                                    className="inline-block w-24 h-24 rounded-full"
                                >
                                    <img src={board.picture_url} alt={board.name} />
                                </li>
                            ))}
                        </BoardsContainer>
                    );
                }
            }
        }
        else {
            return (
                <BoardsContainer>
                    <li>
                        <AlertCircleIcon />
                    </li>
                </BoardsContainer>
            );
        }
    }
}
