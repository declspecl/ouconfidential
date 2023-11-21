"use client";

import { useRouter } from "next/navigation";
import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface LeaveBoardButtonProps {
    boardName: string
}

export function LeaveBoardButton({ boardName }: LeaveBoardButtonProps) {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    return (
        <button
            onClick={async () => {
                const user = await supabase.auth.getUser();

                const { data: board, error: getBoardError } = await supabase.from("boards")
                    .select("*")
                    .eq("name", boardName);

                if (getBoardError)
                    return alert(getBoardError.message);

                const { error: leaveBoardError } = await supabase.from("boards_users")
                    .delete()
                    .eq("board_id", board![0].board_id)
                    .eq("user_uuid", user.data?.user?.id!);

                router.refresh();
            }}
            className="px-4 py-1.5 rounded-md bg-rose text-rp-base transition-[filter] hover:brightness-110"
        >
            Leave board
        </button>
    );
}
