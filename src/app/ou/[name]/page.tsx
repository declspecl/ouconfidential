import { cookies } from "next/headers";
import { Database } from "@/backend/database.types";
import { BoardPosts } from "@/components/pages/Board/BoardPosts";
import { CreatePostForm } from "@/components/pages/CreatePostForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Sidebar } from "@/components/pages/Sidebar";

interface BoardProps {
    params: {
        name: string
    }
}

export default async function Board({ params }: BoardProps) {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });

    const { data: nameMatchBoard, error: getBoardError } = await supabase.from("boards")
        .select("*")
        .eq("name", params.name);

    if (getBoardError) {
        return <p>A fatal error occured: {getBoardError.message}</p>
    }

    if (nameMatchBoard.length === 1) {
        // getting posts in this board
        const { data: posts, error: getPostsError } = await supabase.from("posts")
            .select("*")
            .eq("parent_board", nameMatchBoard[0].board_id)
            .order("created_at", { ascending: false });

        // QoL destructuring
        const { name: boardName, created_at: createdAt, picture_url: pictureURL } = nameMatchBoard[0];

        if (!getPostsError) {
            return (
                <div className="w-full h-full flex flex-row">
                    <Sidebar />

                    <div className="py-5 grow flex flex-row justify-center bg-background-200">
                        <div className="px-6 py-4 w-[80rem] mx-auto bg-background rounded-lg overflow-y-scroll border-2 border-background-250">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row items-center gap-2">
                                    <img className="w-32 h-32 object-cover object-center border border-gray-400 rounded-full" src={pictureURL} alt={boardName} />

                                    <div className="flex flex-col items-start gap-3 translate-y-[12.5%]">
                                        <h1 className="text-4xl font-medium">{boardName}</h1>

                                        <p className="text-base text-gray-500">Created: {new Date(createdAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                <p className="text-lg text-black">{nameMatchBoard[0].description}</p>
                            </div>

                            <div className="pt-8 flex flex-col gap-4">
                                <h2 className="text-4xl font-medium">Posts</h2>

                                <BoardPosts posts={posts} />
                            </div>

                            <CreatePostForm boardName={nameMatchBoard[0].name} />
                        </div>
                    </div>
                </div>
            );
        }
        else return <p>A fatal error occured: {getPostsError.message}</p>;
    }
    else return <p>Invalid board.</p>;
}
