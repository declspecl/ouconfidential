"use server";

import { Database } from "@/backend/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface CreateCommentResponse {
    error: string | null
}

export async function createComment(formData: FormData): Promise<CreateCommentResponse> {
    // define supabase client
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    // get user
    const { data: { user: user }, error } = await supabase.auth.getUser();

    if (error || !user)
        return { error: "An error occured when trying to retrieve the current user." }

    // session is valid, getting form data
    const commentContent: string | null = formData.get("content") as string | null;
    const postID: string | null = formData.get("postID") as string | null;

    // checking if form data is missing / invalid
    if (!commentContent || !postID)
        return { error: "The comment content, or somehow, the post ID, was not submitted" };
    
    const { data: parentPost, error: getParentPostError } = await supabase.from("posts")
        .select("*")
        .eq("post_id", postID);

    if (getParentPostError)
        return { error: getParentPostError.message };

    if (!parentPost || parentPost.length === 0)
        return { error: "The post you are trying to comment on does not exist." };

    const { error: insertCommentError } = await supabase.from("comments")
        .insert({
            content: commentContent,
            parent_post: parentPost[0].post_id,
            creator_uuid: user.id
        });

    if (insertCommentError)
        return { error: insertCommentError.message };

    return { error: null };
}
