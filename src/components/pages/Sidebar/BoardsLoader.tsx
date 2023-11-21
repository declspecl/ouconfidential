import { cookies } from "next/headers";
import { BoardPicture } from "./BoardPicture";
import { AlertCircleIcon } from "lucide-react";
import { prettifyBoardName } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

function ErroredBoard() {
    return (
        <li>
            <AlertCircleIcon className="w-full h-full stroke-text rounded-full" />
        </li>
    );
}

export async function BoardsLoader() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });
    
    const { data: { user: user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        console.error(authError);

        return <></>;
    }
    else if (!user)
        return <></>;

    const { data: joinedBoards, error: getJoinedBoardsError } = await supabase.from("boards_users")
        .select("*")
        .eq("user_uuid", user.id);

    if (getJoinedBoardsError) {
        console.error(getJoinedBoardsError);

        return <ErroredBoard />;
    }

    const { data: matchingBoards, error: getMatchingBoardsError } = await supabase.from("boards")
        .select("*")
        .in("board_id", joinedBoards.map(board => board.board_id));

    if (getMatchingBoardsError) {
        console.error(getMatchingBoardsError);

        return <ErroredBoard />;
    }

    return (
        <>
            {matchingBoards.map(board => (
                <Tooltip
                    content={prettifyBoardName(board.name)}
                    key={`sidebar-${board.name}`}
                    side="right"
                >
                    <BoardPicture
                        name={board.name}
                        src={board.picture_url}
                        target={board.name}
                    />
                </Tooltip>
            ))}
        </>
    );
}
