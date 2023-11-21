"use client";

import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface DeletePostButtonProps {
    boardName: string,
    postID: number
}

export function DeletePostButton({ boardName, postID }: DeletePostButtonProps) {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <button
            onClick={async () => {
                const { error: deletePostError } = await supabase.from("posts")
                    .delete()
                    .eq("post_id", postID);

                router.push(`/ou/${boardName}`);
                router.refresh();
            }}
            className="w-fit px-4 py-1.5 rounded-md bg-rose text-rp-base transition-[filter] hover:brightness-110"
        >
            Delete post
        </button>
    );
}
