import { Separator } from "@/components/ui/Separator";
import { PostListing } from "./PostListing";
import type { Database } from "@/backend/database.types";

interface BoardPostsProps {
    posts: Database["public"]["Tables"]["posts"]["Row"][],
    boardName: string
}

export function BoardPosts({ posts, boardName }: BoardPostsProps) {
    return (
        <ul className="p-3 flex flex-col gap-6 border border-muted border-opacity-50 rounded-md">
            {posts.map((post, index) => {
                return (
                    <>
                        <PostListing post={post} boardName={boardName} key={`${post.title}-${post.post_id}`} />

                        {index !== posts.length - 1 && (
                            <Separator key={`separator-${index}`} orientation="horizontal" className="mx-auto w-full h-[2px] bg-muted rounded-full" />
                        )}
                    </>
                );
            })}
        </ul>
    )
}
