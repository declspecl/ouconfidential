interface CreatePostProps {
    params: {
        name: string
    }
}

export default function CreatePost({ params }: CreatePostProps) {
    return <p>{params.name}</p>;
}
