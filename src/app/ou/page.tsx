import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";

export default async function OUBoards() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const { data: joinedBoards, error: getJoinedBoardsError } = await supabase.from("boards")
        .select("*")
        .order("created_at", { ascending: true });

    if (getJoinedBoardsError)
        return <p>{getJoinedBoardsError.message}</p>

    return (
        <div className="flex flex-col gap-12">
            <div>
                <h1 className="text-gold">All Boards</h1>

                <h3>Found a board you like? Join it!</h3>

                <h4 className="inline">
                    Want to create a board?&nbsp;

                    <Link
                        href="/ou/create"
                        className={cn(
                            "inline-flex flex-row items-center gap-1 text-rose underline transition-[filter]",
                            "hover:brightness-110"
                        )}
                    >
                        Do it here!

                        <ExternalLinkIcon />
                    </Link>
                </h4>
            </div>

            <div className={cn(
                "w-full grid grid-cols-1 gap-4",
                "lg:grid-cols-2"
            )}>
                {joinedBoards.map((board) => (
                    <div
                        key={board.name}
                        className="p-4 w-full border border-muted border-opacity-75 rounded-xl transition-[border] hover:border-opacity-100"
                    >
                        <BoardInfoHeader
                            name={board.name}
                            description={board.description}
                            pictureURL={board.picture_url}
                            createdAt={new Date(board.created_at)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
