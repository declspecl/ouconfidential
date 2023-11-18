import { Database } from "@/backend/database.types";
import { BoardPosts } from "@/components/Board/BoardPosts";
import { CreatePostForm } from "@/components/CreatePostForm";
import Sidebar from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface BoardProps {
    params: {
        name: string
    }
}

export default async function Board({ params }: BoardProps) {
    const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });
    const { data: nameMatchBoard, error } = await supabase.from("boards").select("*").eq("name", params.name);

    if (error) {
        return <p>{JSON.stringify(error, null, 2)}</p>
    }

    if (nameMatchBoard.length === 1) {
        const { data: posts, error } = await supabase.from("posts").select("*").eq("parent_board", nameMatchBoard[0].board_id);

        if (error) {
            console.error(error);

            return (
                <p>{JSON.stringify(error, null, 2)}</p>
            );
        }
        else {
            return (
                <div className="w-full h-full flex flex-row">
                    <Sidebar />

                    <div className="mx-60 grow">
                        <h1 className="text-4xl">{nameMatchBoard[0].name}</h1>
                        <p>Created at: {new Date(nameMatchBoard[0].created_at).toString()}</p>

                        <img className="w-[300px] h-[300px]" src={nameMatchBoard[0].picture_url} alt={nameMatchBoard[0].name} />

                        <h2 className="text-3xl">Posts</h2>
                        <CreatePostForm boardName={nameMatchBoard[0].name} />
                        <BoardPosts posts={posts} />
                    </div>
                </div>
            );
        }
    }
    else
        return <p>Invalid board.</p>;
}
