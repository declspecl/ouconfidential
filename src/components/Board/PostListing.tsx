import type { Database } from "@/backend/database.types";

interface PostListingProps {
    post: Database["public"]["Tables"]["posts"]["Row"]
}

export function PostListing({ post }: PostListingProps) {
    return (
        <li className="p-2 rounded-md border border-gray-300 bg-gray-100">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-4xl">{post.title}</h1>

                    <p className="text-base text-text-300">Created: {new Date(post.created_at).toLocaleString()}</p>
                </div>

                <p className="rounded-md text-lg">{post.description}</p>
            </div>
        </li>
    )
}
