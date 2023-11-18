"use client";

import { useState } from "react";
import { createBoard } from "@/actions/boards";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function CreateBoardForm() {
    const supabase = createClientComponentClient();

    const [error, setError] = useState<any>(null);

    async function createBoardClientAction(formData: FormData) {
        console.log("yo this is from the client yo");

        try {
            console.log("trying yo");

            await createBoard(formData);

            console.log("done trying yo");
        }
        catch (error) {
            console.log("error yo");

            console.log(JSON.stringify(error));

            setError(error);
        }
    }

	return (
        <form className="flex flex-col text-text" action={createBoardClientAction}>
            <label htmlFor="boardName">Board name</label>
            <input className="bg-white text-black" type="text" placeholder="general" name="boardName" />

            <label htmlFor="profilePicture">Profile picture</label>
            <input type="file" accept="image/png,image/jpeg" name="boardPicture" />

            <button type="submit">
                Create
            </button>

            <p className="text-text">
                {error ? JSON.stringify(error) : "no error"}
            </p>
        </form>
    );
}
