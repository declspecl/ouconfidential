import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostListing } from "@/components/pages/Board/PostListing";
import { Separator } from "@/components/ui/Separator";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import { Comments } from "@/components/pages/Post/Comments";
import { DeletePostButton } from "@/components/ui/DeletePostButton";

interface PostProps {
    params: {
        name: string,
        postID: string
    }
}

export default async function Post({ params }: PostProps) {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const user = await supabase.auth.getUser();

    const { data: nameMatchBoard, error: getBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", params.name);

    if (getBoardError) {
        return <p>A fatal error occured: {getBoardError.message}</p>
    }

    if (!nameMatchBoard || nameMatchBoard.length === 0) {
        return <h1 className="text-gold">Invalid post</h1>
    }

    const { data: post, error: getPostError } = await supabase.from("posts")
        .select("*")
        .eq("post_id", params.postID)
        .eq("parent_board", nameMatchBoard[0].board_id);

    if (getPostError) {
        return <p>A fatal error occured: {getPostError.message}</p>
    }

    if (!post || post.length === 0)
        return <h1 className="text-gold">Invalid post</h1>

    return (
        <div className="flex flex-col gap-6">
            <BoardInfoHeader
                name={nameMatchBoard[0].name}
                description={nameMatchBoard[0].description}
                createdAt={new Date(nameMatchBoard[0].created_at)}
                pictureURL={nameMatchBoard[0].picture_url}
            />

            <ul>
                <PostListing post={post[0]} boardName={params.name} />
            </ul>

            {user && user.data && user.data.user && post[0].creator_uuid === user.data.user.id && (
                <DeletePostButton boardName={params.name} postID={post[0].post_id} />
            )}

            <Separator orientation="horizontal" className="w-full h-[2px] bg-muted rounded-full" />

            <Comments postID={params.postID} boardName={params.name} />
        </div>
    );
}
