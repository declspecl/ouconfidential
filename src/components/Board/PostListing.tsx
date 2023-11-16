import type { Database } from "@/backend/database.types";

interface PostListingProps {
    post: Database["public"]["Tables"]["posts"]["Row"]
}

export function PostListing({ post }: PostListingProps) {
    return (
        <li className="bg-blue-500">
            <div className="flex flex-row">
                <h1 className="text-4xl">{post.title}</h1>

                <p className="text-base">Created at: {post.created_at}</p>
            </div>

            <p className="text-base">{post.description}</p>
        </li>
    )
}
