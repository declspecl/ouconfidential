"use client";

import { PostListing } from "./PostListing";
import type { Database } from "@/backend/database.types";

interface BoardPostsProps {
    posts: Database["public"]["Tables"]["posts"]["Row"][]
}

export function BoardPosts({ posts }: BoardPostsProps) {
    return (
        <ul className="flex flex-col gap-8">
            {posts.map((post) => {
                return (
                    <PostListing post={post} key={`${post.title}-${post.post_id}`}/>
                );
            })}
        </ul>
    )
}
