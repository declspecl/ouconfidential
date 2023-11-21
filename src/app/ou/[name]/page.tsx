import Link from "next/link";
import { cookies } from "next/headers";
import { ExternalLinkIcon } from "lucide-react";
import { UserBoardRelationship } from "@/lib/utils";
import { Database } from "@/backend/database.types";
import { getUserBoardRelationship } from "@/actions/boards";
import { BoardPosts } from "@/components/pages/Board/BoardPosts";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { DeleteBoardButton } from "@/components/ui/DeleteBoardButton";
import { JoinBoardButton } from "@/components/ui/JoinBoardButton";
import { LeaveBoardButton } from "@/components/ui/LeaveBoardButton";
import { Separator } from "@/components/ui/Separator";

interface BoardProps {
    params: {
        name: string
    }
}

export default async function Board({ params }: BoardProps) {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const user = await supabase.auth.getUser();

    const { data: nameMatchBoard, error: getBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", params.name);

    if (getBoardError) {
        return <p>A fatal error occured: {getBoardError.message}</p>
    }

    if (nameMatchBoard.length === 1) {
        // getting posts in this board
        const { data: posts, error: getPostsError } = await supabase.from("posts")
            .select("*")
            .eq("parent_board", nameMatchBoard[0].board_id)
            .order("created_at", { ascending: false });

        // determining if user is the board creator / member
        const userBoardRelationship = await getUserBoardRelationship(params.name);

        // QoL destructuring
        const { name, description, created_at, picture_url } = nameMatchBoard[0];

        if (!getPostsError) {
            return (
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <BoardInfoHeader
                            name={name}
                            description={description}
                            pictureURL={picture_url}
                            createdAt={new Date(created_at)}
                        />

                        <div className="text-gold">
                            {user && user.data && user.data.user && (
                                <>
                                    {userBoardRelationship === UserBoardRelationship.CREATOR ? (
                                        <DeleteBoardButton boardName={params.name} />
                                    ) : (
                                        <>
                                            {userBoardRelationship === UserBoardRelationship.MEMBER ? (
                                                <LeaveBoardButton boardName={params.name} />
                                            ) : (
                                                <JoinBoardButton boardName={params.name} />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="mx-auto w-full h-[2px] bg-muted rounded-full" />

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-gold font-medium">Posts</h2>

                            <Link href={`/ou/${params.name}/create`} className="flex flex-row items-center gap-1 text-rose underline transition-[filter] hover:brightness-110">
                                <h4>Create a post</h4>

                                <ExternalLinkIcon />
                            </Link>
                        </div>

                        {posts.length === 0 ? (
                            <></>
                        ) : (
                            <BoardPosts posts={posts} boardName={params.name} />
                        )}
                    </div>
                </div>
            );
        }
        else return <p>A fatal error occured: {getPostsError.message}</p>;
    }
    else return <p>Invalid board.</p>;
}
