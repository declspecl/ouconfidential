"use client";

import { poppins } from "@/Fonts";
import type { Database } from "@/backend/database.types";
import { cn } from "@/lib/utils";

interface PostListingProps {
    post: Database["public"]["Tables"]["posts"]["Row"]
}

export function PostListing({ post }: PostListingProps) {
    return (
        <button onClick={() => console.log(post.post_id)}>
            <li className="p-3 border border-muted rounded-lg">
                <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-col items-start gap-2">
                        <h3 className={cn("leading-tight text-pine", poppins.className)}>{post.title}</h3>

                        <p className="text-text text-opacity-75">Created: {new Date(post.created_at).toLocaleString()}</p>
                    </div>

                    <p className="rounded-md text-lg">{post.description}</p>
                </div>
            </li>
        </button>
    )
}
