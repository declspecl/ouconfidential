"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/backend/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { sign } from "crypto";

export async function signIn(email: string, password: string): Promise<string | null> {
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    const { error } =  await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error)
        return `Failed to sign in: ${error.message}`;

    redirect("/");
}

export async function signOut(): Promise<string | null> {
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    const { error } =  await supabase.auth.signOut();

    if (error)
        return `Failed to sign out: ${error.message}`;

    redirect("/");
}

export async function signUp(email: string, password: string, grizzID: string): Promise<string | null> {
    const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

    const { data: wouldBeUser, error: wouldBeUserError } = await supabase.from("users")
        .select("*")
        .or(`email.eq.${email},grizz_id.eq.${grizzID}`);

    if (wouldBeUserError)
        return `Failed to fetch users table ${wouldBeUserError.message}`;

    if (wouldBeUser.length !== 0)
        return `A user with that email or grizzID already exists.`;

    const { error: signUpError } = await supabase.auth.signUp({
        email,
        password
    });

    if (signUpError)
        return `Failed to sign up: ${signUpError.message}`;

    const { data, error } = await supabase.auth.getSession();

    console.log(data);

    const { error: insertUserError } = await supabase.from("users")
        .insert({
            user_uuid: data?.session?.user.id,
            email,
            password,
            grizz_id: grizzID
        });

    if (insertUserError)
        return `Failed to insert user into database: ${insertUserError.message}`;

    const { data: newUserData, error: getNewUserDataError } = await supabase.from("users")
        .select("*")
        .eq("grizz_id", grizzID);

    if (getNewUserDataError)
        return `Failed to fetch new user data: ${getNewUserDataError.message}`;

    const { data: generalBoard, error: getGeneralBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", "general");

    if (getGeneralBoardError)
        return `Failed to fetch general board data: ${getGeneralBoardError.message}`;

    if (newUserData.length !== 1 || generalBoard.length !== 1)
        return `Error when trying to fetch new user data or general board data.`;

    const { error: insertUserJoinedGeneralError } = await supabase.from("boards_users")
        .insert({
            user_uuid: newUserData[0].user_uuid,
            board_id: generalBoard[0].board_id
        });

    if (insertUserJoinedGeneralError)
        return `Failed to insert user into general board: ${insertUserJoinedGeneralError.message}`;

    // if (signUpError) {
    //     const { error: bro } = await supabase.from("users")
    //         .delete()
    //         .eq("grizz_id", grizzID);

    //     return `Failed to sign up: ${signUpError.message}`;
    // }

    redirect("/");
}
