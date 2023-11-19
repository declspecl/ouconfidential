import { Sidebar } from "@/components/pages/Sidebar";
import { SignOutButton } from "@/components/pages/SignOutButton";
import { CreateBoardForm } from "@/components/pages/CreateBoardForm";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostListing } from "@/components/pages/Board/PostListing";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const session = await supabase.auth.getSession();

    if (session.error)
        return <p>error session</p>
    else if (!session.data.session || !session.data.session.user)
        return <p>error session data</p>

    const { data: joinedBoards, error: getJoinedBoardsError } = await supabase.from("boards")
        .select("*, posts(*)")
        .limit(3, { foreignTable: "posts" })
        .order("created_at", { ascending: false });

    if (getJoinedBoardsError)
        console.error(getJoinedBoardsError);
    else
        console.log(joinedBoards);

    return (
        <main className="w-full h-full flex flex-row">
            <Sidebar />

            <div className="mx-60 grow">
                <SignOutButton />

                <h1 className="text-2xl">Create board</h1>

                <CreateBoardForm />

                <ul className="flex flex-col gap-4">
                    {joinedBoards?.map((board) => (
                        <>
                            <img className="w-24 h-24 object-cover object-center rounded-full" src={board.picture_url} alt={board.name} />

                            {board.posts.map((post) => (
                                <PostListing post={post} key={post.title} />
                            ))}
                        </>
                    ))}
                </ul>
            </div>
        </main>
    );
}
