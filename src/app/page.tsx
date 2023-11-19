import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";
import { CreateBoardForm } from "@/components/CreateBoardForm";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostListing } from "@/components/Board/PostListing";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const session = await supabase.auth.getSession();

    if (session.error)
        return <p>error session</p>
    else if (!session.data.session || !session.data.session.user)
        return <p>error session data</p>

    const { data: allPosts, error: getPostsError } = await supabase.from("posts")
        .select("*, boards(*, boards_users(*))")
        .order("created_at", { ascending: false });

    if (getPostsError)
        console.error(getPostsError);
    else
        console.log(allPosts);

    return (
        <main className="w-full h-full flex flex-row bg-background">
            <Sidebar />

            <div className="mx-60 grow">
                <SignOutButton />

                <h1 className="text-2xl">Create board</h1>

                <CreateBoardForm />

                <ul className="flex flex-col gap-4">
                    {allPosts?.map((post) => (
                        <>
                            <img className="w-24 h-24 object-cover object-center rounded-full" src={post.boards?.picture_url} alt={post.boards?.name} />
                            <PostListing post={post} key={post.title} />
                        </>
                    ))}
                </ul>
            </div>
        </main>
    );
}
