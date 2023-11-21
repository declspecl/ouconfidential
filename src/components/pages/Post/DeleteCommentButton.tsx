"use client";

import { Trash2Icon } from "lucide-react";
import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface DeleteCommentButtonProps {
    commentID: number
}

export function DeleteCommentButton({ commentID }: DeleteCommentButtonProps) {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <button
            className="w-fit h-fit p-2 bg-overlay rounded-lg transition-[filter] hover:brightness-[1.15]"
            onClick={async () => {
                const user = await supabase.auth.getUser();

                if (!user || !user.data || !user.data.user)
                    return;

                const { error: deleteCommentError } = await supabase.from("comments")
                    .delete()
                    .eq("comment_id", commentID)
                    .eq("creator_uuid", user.data.user.id);

                router.refresh();
            }}
        >
            <Trash2Icon className="stroke-love" />
        </button>
    )
}
