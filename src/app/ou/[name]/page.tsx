import { createClient } from "@/backend/utils";
import { cookies } from "next/headers";

interface BoardProps {
    params: {
        name: string
    }
}

export default async function Board({ params }: BoardProps) {
    const supabase = createClient(cookies());
    const { data: nameMatchBoard, error } = await supabase.from("boards").select("*").eq("name", params.name);

    console.log(params);

    if (error) {
        console.error(error);
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
                        <h1>{nameMatchBoard[0].name}</h1>
                        <p>{nameMatchBoard[0].board_id}</p>
                        <p>{nameMatchBoard[0].created_at}</p>
                        <p>{nameMatchBoard[0].creator_uuid}</p>

                        <h2>Posts</h2>
                        <ul>
                            {posts.map((post) => {
                                return (
                                    <li key={`${post.title}-${post.post_id}`}>
                                        <p>{post.post_id}</p>
                                        <p>{post.parent_board}</p>
                                        <p>{post.creator_uuid}</p>
                                        <p>{post.created_at}</p>
                                        <p>{post.title}</p>
                                        <p>{post.description}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            }
        }
        else {
            return (<p>board not found</p>);
        }
    }
}
