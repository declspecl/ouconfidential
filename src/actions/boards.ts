"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/backend/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

interface CreateBoardResponse {
    error: string | null
}

export async function createBoard(formData: FormData): Promise<CreateBoardResponse> {
    // define supabase client
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    // define error handling functions
    async function deleteUploadedPicture(pictureURL: string) {
        // delete picture from storage
        const { error: pictureDeleteError } = await supabase.storage.from("board-profile-pictures")
            .remove([pictureURL]);

        // picture delete failed
        if (pictureDeleteError)
            return { error: pictureDeleteError.message };
    }

    async function deleteInsertedBoardRow(name: string) {
        // delete board row from database
        const { error: boardDeleteError } = await supabase.from("boards")
            .delete()
            .eq("name", name);

        // board delete failed
        if (boardDeleteError)
            return { error: boardDeleteError.message };
    }

    // resume
    const session = await supabase.auth.getSession();

    if (session.error)
        return { error: "An error occured when trying to retrieve the current session." };
    else if (!session.data.session || !session.data.session.user)
        return { error: "Session is invalid and/or user is not authenticated." };

    // session is valid, getting form data
    const boardName: string | null = formData.get("boardName") as string | null;
    const boardDescription: string | null = formData.get("boardDescription") as string | null;
    const boardPicture: File | null = formData.get("boardPicture") as File | null;

    // checking if form data is missing / invalid
    if (!boardName || !boardDescription || !boardPicture || boardName.match(/^[a-z0-9-]+$/) === null)
        return { error: "Either the board name, description, or picture is missing, or the board name is formatted incorrectly." };
    
    // uploading picture to storage
    const { data: uploadedPictureURL, error: pictureUploadError} = await supabase.storage.from("board-profile-pictures")
        .upload(boardPicture.name, boardPicture);

    // picture upload failed
    if (pictureUploadError)
        return { error: `Failed to upload picture to storage: ${pictureUploadError.message}` };

    // adding board row to database
    const { error: boardInsertError } = await supabase.from("boards")
        .insert({
            name: boardName,
            description: boardDescription,
            picture_url: supabase.storage.from("board-profile-pictures").getPublicUrl(uploadedPictureURL.path).data.publicUrl,
            creator_uuid: session.data.session.user.id
        });

    // picture successfully uploaded, but board insert failed
    // must delete uploaded picture
    if (boardInsertError) {
        deleteUploadedPicture(uploadedPictureURL.path)
            .then(() => {
                console.log("Successfully deleted uploaded picture after board insert failed.");
            })
            .catch((error) => {
                console.error("Failed to delete uploaded picture after board insert failed.");
                console.error(error);
            });

        return { error: boardInsertError.message };
    }

    // reading newly inserted board
    const { data: createdBoardRow, error: readNewBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", boardName);

    // reading newly inserted board failed, but board insert succeeded and picture uploaded
    // must delete inserted board row and uploaded picture
    if (readNewBoardError) {
        deleteInsertedBoardRow(boardName)
            .then(() => {
                console.log("Successfully deleted inserted board row after board insert failed.");
            })
            .catch((error) => {
                console.error("Failed to delete inserted board row after board insert failed.");
                console.error(error);
            });

        deleteUploadedPicture(uploadedPictureURL.path)
            .then(() => {
                console.log("Successfully deleted uploaded picture after board insert failed.");
            })
            .catch((error) => {
                console.error("Failed to delete uploaded picture after board insert failed.");
                console.error(error);
            });

        return { error: readNewBoardError.message };
    }

    // add creator and board pair to junction table to "join" creator to new board
    const { error: creatorJoinNewBoardError } = await supabase.from("boards_users")
        .insert({
            board_id: createdBoardRow[0].board_id,
            user_uuid: session.data.session.user.id
        });

    // creator join new board failed, but board insert and picture upload succeeded
    // must delete inserted board row and uploaded picture
    if (creatorJoinNewBoardError) {
        deleteInsertedBoardRow(boardName)
            .then(() => {
                console.log("Successfully deleted inserted board row after creator join new board failed.");
            })
            .catch((error) => {
                console.error("Failed to delete inserted board row after creator join new board failed.");
                console.error(error);
            });

        deleteUploadedPicture(uploadedPictureURL.path)
            .then(() => {
                console.log("Successfully deleted uploaded picture after creator join new board failed.");
            })
            .catch((error) => {
                console.error("Failed to delete uploaded picture after creator join new board failed.");
                console.error(error);
            });

        return { error: creatorJoinNewBoardError.message };
    }

    revalidatePath("/");

    return { error: null };
}
