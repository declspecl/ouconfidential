import { createClient } from "@/backend/utils";
import { BoardPosts } from "@/components/Board/BoardPosts";
import { cookies } from "next/headers";

interface BoardProps {
    params: {
        name: string
    }
}

export default async function Board({ params }: BoardProps) {
    const supabase = createClient(cookies());
    const { data: nameMatchBoard, error } = await supabase.from("boards").select("*").eq("name", params.name);

    if (error) {
        return <p>{JSON.stringify(error, null, 2)}</p>
    }
    else {
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
                    <div>
                        <h1 className="text-4xl">{nameMatchBoard[0].name}</h1>
                        <p>Created at: {new Date(nameMatchBoard[0].created_at).toString()}</p>

                        <img src={nameMatchBoard[0].picture_url} alt={nameMatchBoard[0].name} />

                        <h2 className="text-3xl">Posts</h2>
                        <BoardPosts posts={posts} />
                    </div>
                );
            }
        }
        else {
            return <p>board not found</p>;
        }
    }
}
