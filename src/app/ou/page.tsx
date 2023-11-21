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

                <Link
                    href="/ou/create"
                    className={cn(
                        "text-rose underline transition-[filter]",
                        "hover:brightness-105"
                    )}
                >
                    <h3 className="flex flex-row items-center gap-1">
                        Create a Board

                        <ExternalLinkIcon />
                    </h3>
                </Link>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                {joinedBoards.map((board) => (
                    <div
                        key={board.name}
                        className="p-4 w-full border border-muted border-opacity-80 rounded-xl"
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
