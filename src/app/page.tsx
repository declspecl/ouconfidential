import { Sidebar } from "@/components/pages/Sidebar";
import { SignOutButton } from "@/components/pages/SignOutButton";
import { CreateBoardForm } from "@/components/pages/CreateBoardForm";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostListing } from "@/components/pages/Board/PostListing";
import { SidebarAndMainContentContainer } from "@/components/layout/SidebarAndMainContentContainer";
import { poppins } from "@/Fonts";
import { cn } from "@/lib/utils";
import { BoardImageWithInfo } from "@/components/layout/BoardImageWithInfo";

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
        <SidebarAndMainContentContainer>
            <div className="flex flex-col gap-4">
                <div className={cn("flex flex-col gap-2", poppins.className)}>
                    <h1 className="leading-normal">Welcome back!</h1>

                    <h3 className={"leading-normal"}>While you were gone...</h3>
                </div>

                <ul className="flex flex-col gap-4">
                    {joinedBoards?.map((board) => (
                        <>
                            <BoardImageWithInfo
                                name={board.name}
                                description={board.description}
                                pictureURL={board.picture_url}
                                createdAt={new Date(board.created_at)}
                            />

                            {board.posts.map((post) => (
                                <PostListing post={post} key={post.title} />
                            ))}
                        </>
                    ))}
                </ul>
            </div>
        </SidebarAndMainContentContainer>
    );
}
