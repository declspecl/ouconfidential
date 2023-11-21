import Link from "next/link";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { BoardPosts } from "@/components/pages/Board/BoardPosts";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface BoardProps {
    params: {
        name: string
    }
}

export default async function Board({ params }: BoardProps) {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

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

        // QoL destructuring
        const { name, description, created_at, picture_url } = nameMatchBoard[0];

        if (!getPostsError) {
            return (
                <div>
                    <div className="flex flex-col gap-2">
                        <BoardInfoHeader
                            name={name}
                            description={description}
                            pictureURL={picture_url}
                            createdAt={new Date(created_at)}
                        />
                    </div>

                    <div className="pt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-gold font-medium">Posts</h2>

                            <Link href={`/ou/${params.name}/create`} className="text-rose">
                                <h4>Create a post</h4>
                            </Link>
                        </div>

                        <BoardPosts posts={posts} />
                    </div>
                </div>
            );
        }
        else return <p>A fatal error occured: {getPostsError.message}</p>;
    }
    else return <p>Invalid board.</p>;
}
