"use client";

import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface DeleteBoardButtonProps {
    boardName: string
}

export function DeleteBoardButton({ boardName }: DeleteBoardButtonProps) {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <button
            onClick={async () => {
                const { error: deleteBoardError } = await supabase.from("boards")
                    .delete()
                    .eq("name", boardName);

                router.push("/");
                router.refresh();
            }}
            className="mx-auto px-4 py-1.5 rounded-md bg-rose text-rp-base transition-[filter] hover:brightness-110"
        >
            Delete board
        </button>
    );
}
