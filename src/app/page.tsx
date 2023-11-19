import { cn } from "@/lib/utils";
import { poppins } from "@/Fonts";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { PostListing } from "@/components/pages/Board/PostListing";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import { SidebarAndMainContentContainer } from "@/components/layout/SidebarAndMainContentContainer";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const session = await supabase.auth.getSession();

    if (session.error)
        return <p>error session</p>
    else if (!session.data.session || !session.data.session.user)
        return <p>error session data</p>

    const { data: joinedBoards, error: getJoinedBoardsError } = await supabase.from("boards")
        .select("*, posts(*)")
        .order("created_at", { ascending: false, foreignTable: "posts" })
        .limit(3, { foreignTable: "posts" });

    if (getJoinedBoardsError)
        console.error(getJoinedBoardsError);
    else
        console.log(joinedBoards);

    return (
        <SidebarAndMainContentContainer>
            <div className="flex flex-col gap-12">
                <div className={cn("flex flex-col gap-2", poppins.className)}>
                    <h1 className="leading-normal text-gold">Welcome back!</h1>

                    <h3 className="leading-normal text-rose">While you were gone...</h3>
                </div>

                <div className="flex flex-col gap-12">
                    {joinedBoards?.map((board) => (
                        <div key={board.name} className="flex flex-col gap-6">
                            <BoardInfoHeader
                                name={board.name}
                                description={board.description}
                                pictureURL={board.picture_url}
                                createdAt={new Date(board.created_at)}
                            />
                            
                            <ul className="flex flex-col gap-4">
                                {board.posts.map((post) => (
                                    <PostListing post={post} key={post.title} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </SidebarAndMainContentContainer>
    );
}
