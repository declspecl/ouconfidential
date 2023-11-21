import { Database } from "@/backend/database.types";
import { DeleteCommentButton } from "./DeleteCommentButton";

interface CommentListingProps {
    comment: Database["public"]["Tables"]["comments"]["Row"],
    isCreator: boolean
}

export function CommentListing({ comment, isCreator }: CommentListingProps) {
    return (
        <div className="w-full p-2 flex flex-row justify-between items-center bg-overlay bg-opacity-70 border border-muted border-opacity-60 rounded-md">
            <div className="w-[calc(100%-3rem)] flex flex-col items-start text-left">
                <p className="w-full max-w-full break-words">{comment.content}</p>

                <small className="text-text text-opacity-75">{new Date(comment.created_at).toLocaleString()}</small>
            </div>

            {isCreator && (
                <DeleteCommentButton commentID={comment.comment_id} />
            )}
        </div>
    );
}
