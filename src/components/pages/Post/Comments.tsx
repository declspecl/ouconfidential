import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CommentListing } from "./CommentListing";
import { CreateCommentForm } from "./CreateCommentForm";

interface CommentProps {
    postID: string,
    boardName: string
}

export async function Comments({ postID, boardName }: CommentProps) {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const user = await supabase.auth.getUser();

    if (!user || !user.data || !user.data.user)
        return <h3 className="text-gold">You must be logged in to view comments.</h3>;

    const { data: comments, error: getCommentsError } = await supabase.from("comments")
        .select("*")
        .eq("parent_post", postID)
        .order("created_at", { ascending: false });

    if (getCommentsError)
        return <p>A fatal error occured: {getCommentsError.message}</p>;

    if (!comments)
        return <h3 className="text-gold">Invalid comments.</h3>;

    return (
        <div className="flex flex-col gap-4">
            {comments.length > 0 ? (
                <h3 className="text-gold">Comments</h3>
            ) : (
                <h3 className="text-gold">There are no comments yet</h3>
            )}

            <CreateCommentForm postID={postID} />

            {comments.map((comment) => (
                <CommentListing
                    key={`${comment.parent_post}-${comment.comment_id}}`}
                    isCreator={comment.creator_uuid === user.data.user?.id}
                    comment={comment}
                />
            ))}
        </div>
    );
}
