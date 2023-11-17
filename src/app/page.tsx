import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/backend/database.types";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Home() {
    async function handleCreateBoard(formData: FormData) {
        "use server";

        const supabase = createServerActionClient<Database>({ cookies: () => cookies() });

        const user = await supabase.auth.getUser();

        console.log(formData);

        const profilePicture = formData.get("profilePicture") as File;

        const { data: uploadedUrl, error } = await supabase.storage.from("board-profile-pictures").upload(profilePicture.name, profilePicture);

        const realUploadedURL = supabase.storage.from("board-profile-pictures").getPublicUrl(uploadedUrl!.path);

        if (error) {
            console.error(error);
        }
        else {
            const { error: ur } = await supabase.from("boards").insert({
                name: formData.get("boardName") as string,
                picture_url: realUploadedURL.data.publicUrl,
                creator_uuid: user.data.user?.id as string
            });

            console.log(ur);

            const { data: newlyCreatedBoard, error } = await supabase.from("boards").select("*").eq("name", formData.get("boardName") as string);

            if (error) {
                console.log("its here");
                console.error(error);
            }
            else {
                const { error: er } = await supabase.from("boards_users").insert({
                    board_id: newlyCreatedBoard[0].board_id,
                    user_uuid: user.data.user?.id as string
                })

                if (er) console.error(er);

                revalidatePath(`/ou/${newlyCreatedBoard[0].name}`);
            }
        }
    }

    return (
        <main className="w-full h-full flex flex-row bg-background">
            <Sidebar />

            <div className="flex flex-col gap-2">
                <SignOutButton />

                <div className="flex flex-col gap-2">
                    <h1>Create board</h1>

                    <form className="flex flex-col text-text" action={handleCreateBoard}>
                        <input className="bg-white text-black" type="text" placeholder="Board name" name="boardName" />

                        <label htmlFor="profilePicture">Profile picture</label>
                        <input type="file" accept="image/png,image/jpeg" name="profilePicture" />

                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        </main>
    );
}
