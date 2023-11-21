import { prettifyBoardName } from "@/lib/utils";
import { CreatePostForm } from "@/components/pages/CreatePostForm";

interface CreatePostProps {
    params: {
        name: string
    }
}

export default function CreateBoard({ params }: CreatePostProps) {
    return (
        <div className="flex flex-col gap-12">
            <div>
                <h1 className="text-gold">Create Post</h1>

                <h4>Use this form to create a post in <span className="text-rose">{prettifyBoardName(params.name)}</span></h4>
            </div>

            <CreatePostForm boardName={params.name} />
        </div>
    );
}
