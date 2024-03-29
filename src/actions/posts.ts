"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Database } from "@/backend/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

interface CreatePostResponse {
    error: string | null
}

export async function createPost(formData: FormData): Promise<CreatePostResponse> {
    // define supabase client
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    // get user
    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error || !user)
        return { error: "An error occured when trying to retrieve the current user." }

    // session is valid, getting form data
    const postTitle: string | null = formData.get("postTitle") as string | null;
    const postDescription: string = (formData.get("postDescription") as string | null) || "";
    const boardName: string | null = formData.get("boardName") as string | null;

    // checking if form data is missing / invalid
    if (!postTitle || !boardName)
        return { error: "Either the post title, or somehow, board name, were not submitted." };

    // reading newly inserted board
    const { data: parentBoardRow, error: readParentBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", boardName);

    if (readParentBoardError)
        return { error: `Failed to read parent board of post: ${readParentBoardError.message}` };
    else if (parentBoardRow.length !== 1)
        return { error: "Invalid parent board." };

    // inserting post into database
    const { error: insertPostError } = await supabase.from("posts")
        .insert({
            title: postTitle,
            description: postDescription,
            parent_board: parentBoardRow[0].board_id,
            creator_uuid: user.id
        });

    if (insertPostError)
        return { error: `Failed to insert post into database: ${insertPostError.message}` };

    redirect(`/ou/${boardName}`);
}
