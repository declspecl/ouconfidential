"use client";

import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface JoinBoardButtonProps {
    boardName: string
}

export function JoinBoardButton({ boardName }: JoinBoardButtonProps) {
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

                const { error: joinBoardError } = await supabase.from("boards_users")
                    .insert({
                        board_id: board![0].board_id,
                        user_uuid: user.data?.user?.id!
                    });

                // router.push(`/ou/${boardName}`);
                router.refresh();
            }}
            className="px-4 py-1.5 rounded-md bg-rose text-rp-base transition-[filter] hover:brightness-110"
        >
            Join board
        </button>
    );
}
