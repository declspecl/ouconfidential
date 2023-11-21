import { cn } from "@/lib/utils";
import { poppins } from "@/Fonts";
import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { PostListing } from "@/components/pages/Board/PostListing";
import { BoardInfoHeader } from "@/components/layout/BoardInfoHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { SignOutButton } from "@/components/ui/SignOutButton";

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
        return <p>error</p>
    }

    const { data: joinedBoardsAndPosts, error: getJoinedBoardsAndPostsError } = await supabase.from("boards")
        .select("*, posts(*)")
        .in("board_id", joinedBoards.map(board => board.board_id))
        .order("created_at", { ascending: false, foreignTable: "posts" })
        .order("created_at", { ascending: false })
        .limit(3, { foreignTable: "posts" });

    if (getJoinedBoardsAndPostsError) {
        console.error(getJoinedBoardsAndPostsError);
        return <p></p>
    }

    return (
        <div className="w-full flex flex-col gap-12">
            <div className={cn("w-full flex flex-col", poppins.className)}>
                <h1 className="leading-normal text-gold">Welcome back!</h1>

                <h3 className="leading-normal text-rose">While you were gone...</h3>
            </div>

            <div className="w-full flex flex-col gap-12">
                {joinedBoardsAndPosts?.map((board) => (
                    <div key={board.name} className="w-full flex flex-col gap-6">
                        <BoardInfoHeader
                            name={board.name}
                            description={board.description}
                            pictureURL={board.picture_url}
                            createdAt={new Date(board.created_at)}
                        />

                        <ul className="w-full flex flex-col gap-4">
                            {board.posts.map((post) => (
                                <PostListing post={post} key={post.title} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
