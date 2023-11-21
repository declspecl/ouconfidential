"use client";

import { poppins } from "@/Fonts";
import type { Database } from "@/backend/database.types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PostListingProps {
    post: Database["public"]["Tables"]["posts"]["Row"],
    boardName: string
}

export function PostListing({ post, boardName }: PostListingProps) {
    return (
        <button className="transition-[filter] hover:brightness-110" onClick={() => console.log(post.post_id)}>
            <li>
                <Link href={`/ou/${boardName}/${post.post_id}`}>
                    <div className="w-full flex flex-col items-start gap-2">
                        <div className="flex flex-col items-start gap-2">
                            <h3 className={cn("text-left leading-tight text-pine", poppins.className)}>{post.title}</h3>

                            <small className="text-left text-text text-opacity-75 break-all">Created: {new Date(post.created_at).toLocaleString()}</small>
                        </div>

                        <p className="text-left break-words">{post.description}</p>
                    </div>
                </Link>
            </li>
        </button>
    )
}
