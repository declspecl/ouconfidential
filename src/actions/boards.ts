"use server";

import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function createBoard(formData: FormData) {
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    const session = await supabase.auth.getSession();

    if (session.error)
        throw session.error;
    else if (!session.data.session || !session.data.session.user)
        throw new Error("Session is invalid and/or user is not authenticated.");

    const boardName: string | null = formData.get("boardName") as string | null;
    const boardPicture: File | null = formData.get("boardPicture") as File | null;

    if (!boardName || !boardPicture)
        throw new Error("Board name and/or picture is missing.");

    const { data: uploadedPictureURL, error: pictureUploadError} = await supabase.storage.from("board-profile-pictures")
        .upload(boardPicture.name, boardPicture);

    if (pictureUploadError)
        throw pictureUploadError;

    const { error: boardInsertError } = await supabase.from("boards")
        .insert({
            name: boardName,
            picture_url: supabase.storage.from("board-profile-pictures").getPublicUrl(uploadedPictureURL.path).data.publicUrl,
            creator_uuid: session.data.session.user.id
        });

    if (boardInsertError)
        throw boardInsertError;

    const { data: createdBoardRow, error: readNewBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", formData.get("boardName") as string);

    if (readNewBoardError)
        throw readNewBoardError;

    const { error: creatorJoinNewBoardError } = await supabase.from("boards_users")
        .insert({
            board_id: createdBoardRow[0].board_id,
            user_uuid: session.data.session.user.id
        });

    if (creatorJoinNewBoardError)
        throw creatorJoinNewBoardError;
}
