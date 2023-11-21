"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/backend/database.types";
import { UserBoardRelationship } from "@/lib/utils";
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
    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error || !user)
        return { error: "An error occured when trying to retrieve the current user." }

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
            creator_uuid: user.id
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
            user_uuid: user.id
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

    redirect(`/ou/${boardName}`);
}

export async function getUserBoardRelationship(boardName: string): Promise<UserBoardRelationship> {
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error || !user)
        return UserBoardRelationship.NONE;

    const { data: boardRows, error: boardRowsError } = await supabase.from("boards")
        .select("*")
        .eq("name", boardName);

    console.log(boardRows);

    if (boardRowsError || boardRows.length !== 1)
        return UserBoardRelationship.NONE;

    const { data: createdBoardRows, error: getCreatedBoardRowsError } = await supabase.from("boards")
        .select("*")
        .eq("creator_uuid", user.id)
        .eq("board_id", boardRows[0].board_id);

    if (getCreatedBoardRowsError)
        return UserBoardRelationship.NONE;

    if (createdBoardRows.length === 1)
        return UserBoardRelationship.CREATOR;

    const { data: boardUserRows, error: boardUserRowsError } = await supabase.from("boards_users")
        .select("*")
        .eq("user_uuid", user.id)
        .eq("board_id", boardRows[0].board_id);

    if (boardUserRowsError || boardUserRows.length === 0)
        return UserBoardRelationship.NONE;

    return UserBoardRelationship.MEMBER;
}

export async function joinBoard(boardName: string): Promise<string | null> {
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error)
        return "An error occured when trying to retrieve the current user.";

    if (!user)
        return "You must be logged in to join a board.";

    const { data: boardRows, error: boardRowsError } = await supabase.from("boards")
        .select("*")
        .eq("name", boardName);

    if (boardRowsError)
        return boardRowsError.message;

    if (boardRows.length === 0)
        return "The board you are trying to join does not exist.";

    const { data: boardUserRows, error: boardUserRowsError } = await supabase.from("boards_users")
        .select("*")
        .eq("board_id", boardRows[0].board_id)
        .eq("user_uuid", user.id);

    if (boardUserRowsError)
        return boardUserRowsError.message;

    if (boardUserRows.length > 0)
        return "You are already a member of this board.";

    const { error: boardUserInsertError } = await supabase.from("boards_users")
        .insert({
            board_id: boardRows[0].board_id,
            user_uuid: user.id
        });

    if (boardUserInsertError)
        return boardUserInsertError.message;

    redirect(`/ou/${boardName}`);
}
