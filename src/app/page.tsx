import { cn } from "@/lib/utils";
import { poppins } from "@/Fonts";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { PostListing } from "@/components/pages/Board/PostListing";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/Separator";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const session = await supabase.auth.getSession();

    if (session.error || !session.data.session || !session.data.session.user) {
        return (
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-gold">Looks like you aren&apos;t signed in!</h2>

                    <h4>You&apos;re missing out on some cool features like a customized digest on the boards you&apos;ve joined.</h4>
                </div>

                <h5>If you have an account, <Link href="/login" className="text-rose underline">log in</Link>. Otherwise, <Link href="/signup" className="text-rose underline">sign up</Link>.</h5>
            </div>
        );
    }

    console.log(session.data.session.user.id);

    const { data: joinedBoards, error: getJoinedBoardsError } = await supabase.from("boards_users")
        .select("*")
        .eq("user_uuid", session.data.session.user.id);

    console.log(joinedBoards);

    if (getJoinedBoardsError) {
        console.error(getJoinedBoardsError);
        return <p>{getJoinedBoardsError.message}</p>
    }

    const { data: joinedBoardsAndPosts, error: getJoinedBoardsAndPostsError } = await supabase.from("boards")
        .select("*, posts(*)")
        .in("board_id", joinedBoards.map(board => board.board_id))
        .order("created_at", { ascending: false, foreignTable: "posts" })
        .order("created_at", { ascending: false })
        .limit(3, { foreignTable: "posts" });

    if (getJoinedBoardsAndPostsError) {
        console.error(getJoinedBoardsAndPostsError);
        return <p>{getJoinedBoardsAndPostsError.message}</p>
    }

    return (
        <div className="w-full flex flex-col gap-12">
            <div className={cn("w-full flex flex-col", poppins.className)}>
                <h1 className="leading-normal text-gold">Welcome back!</h1>

                {joinedBoards.length === 0 ? (
                    <h4>You haven&apos;t joined any boards yet! Find some&nbsp;

                        <Link href="/ou" className="inline-flex flex-row items-center gap-1 text-rose underline">
                            here!

                            <ExternalLinkIcon />
                        </Link>
                    </h4>
                ) : (
                    <h3 className="leading-normal text-rose">While you were gone...</h3>
                )}
            </div>

            <div className="w-full flex flex-col gap-12">
                {joinedBoardsAndPosts?.map((board, index) => (
                    <div key={`digest-${board.name}`} className="p-4 w-full flex flex-col gap-6 border border-muted border-opacity-75 rounded-md">
                        <BoardInfoHeader
                            name={board.name}
                            description={board.description}
                            pictureURL={board.picture_url}
                            createdAt={new Date(board.created_at)}
                        />
                        
                        <Separator orientation="horizontal" className="mx-auto w-full h-[2px] bg-muted rounded-full" />

                        <ul className="w-full flex flex-col gap-8">
                            {board.posts.length === 0 ? (
                                <h5 className="inline">
                                    There aren&apos;t any posts here! Why don&apos;t you&nbsp;

                                    <Link href={`/ou/${board.name}/create`} className="inline-flex flex-row gap-1 items-center text-rose underline">
                                        make one?

                                        <ExternalLinkIcon />
                                    </Link>
                                </h5>
                            ) : (
                                <>
                                    {board.posts.map((post) => (
                                        <PostListing post={post} boardName={board.name} key={`${post.creator_uuid}-${post.title}-${post.created_at}`} />
                                    ))}
                                </>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
