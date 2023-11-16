"use client";

import type { Database } from "@/backend/database.types";
import { PostListing } from "./PostListing";

interface BoardPostsProps {
    posts: Database["public"]["Tables"]["posts"]["Row"][]
}

export function BoardPosts({ posts }: BoardPostsProps) {
    return (
        <ul className="flex flex-col gap-6 bg-gold-500">
            {posts.map((post) => {
                return (
                    <PostListing post={post} key={`${post.title}-${post.post_id}`}/>
                );
            })}
        </ul>
    )
}
