import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function CreateBoardForm() {
    const supabase = createServerComponentClient({ cookies: () => cookies() });

    function createBoard(formData: FormData) {
        const boardName = formData.get("name")!;

        const { error } = await supabase.from("boards").insert({ name: boardName });
    }

	return (
        <form action={createBoard}>
            <input type="text" name="name" placeholder="board name" />

            <button type="submit">Create Board</button>
        </form>
    );
}
