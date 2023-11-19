"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useOptimistic } from "react";
import * as Form from "@radix-ui/react-form";
import { createPost } from "@/actions/posts";
import { Loader2Icon } from "lucide-react";

enum CreatePostFormState {
    IDLE,
    LOADING,
    DONE
}

interface CreatePostFormProps {
    boardName: string,
    className?: string
}

export function CreatePostForm({ boardName, className }: CreatePostFormProps) {
    const postTitleRef = useRef<HTMLInputElement>(null!);
    const postDescriptionRef = useRef<HTMLInputElement>(null!);
    
    const [formState, setFormState] = useOptimistic<CreatePostFormState>(CreatePostFormState.IDLE);

    const [error, setError] = useState<string | null | undefined>(undefined);

    async function createPostClientAction(formData: FormData) {
        if (formState !== CreatePostFormState.LOADING) {
            setFormState(CreatePostFormState.LOADING);

            const { error } = await createPost(formData);

            setError(error);

            if (!error) {
                postTitleRef.current.value = "";
                postDescriptionRef.current.value = "";
            }

            setFormState(CreatePostFormState.DONE);
        }
    }

	return (
        <Form.Root className={cn("min-w-[42rem] flex flex-col gap-2 text-text", className)} action={createPostClientAction}>
            <div className="w-full flex flex-col items-start gap-2">
                <Form.Field name="postTitle" className="w-full flex flex-col">
                    <div className="flex flex-row justify-between gap-16">
                        <Form.Label className="text-lg">Post title <span className="text-red-500">*</span></Form.Label>

                        <div className="flex flex-col items-center">
                            <Form.Message className="break-words whitespace-normal" match="valueMissing">Please enter the post&apos;s title</Form.Message>
                            <Form.Message className="break-words whitespace-normal" match={(value) => value.length > 60}>Please enter a title 60 characters or less</Form.Message>
                        </div>
                    </div>

                    <Form.Control
                        type="text"
                        ref={postTitleRef}
                        placeholder="Hi!"
                        required
                        className={cn(
                            "px-2 py-1 rounded-md border border-gray-400"
                        )}
                    />
                </Form.Field>

                <Form.Field name="postDescription" className="w-full flex flex-col">
                    <div className="flex flex-row justify-between gap-16">
                        <Form.Label className="text-lg">Post description <span className="text-red-500">*</span></Form.Label>

                        <div className="flex flex-col items-center">
                            <Form.Message className="break-words whitespace-normal" match="valueMissing">Please enter the post&apos;s description</Form.Message>
                        </div>
                    </div>

                    <Form.Control
                        type="text"
                        ref={postDescriptionRef}
                        placeholder="Hi!"
                        required
                        className={cn(
                            "px-2 py-1 rounded-md border border-gray-400"
                        )}
                    />
                </Form.Field>

                <input type="text" name="boardName" value={boardName} hidden readOnly aria-readonly />
            </div>

            <div className="flex flex-col items-center gap-2">
                {formState !== CreatePostFormState.LOADING && (
                    <>
                        {error ? (
                            <p>{error}</p>
                        ) : error === null && (
                            <p>Board created successfully!</p>
                        )}
                    </>
                )}

                <Form.Submit disabled={formState === CreatePostFormState.LOADING} className="px-4 py-1.5 bg-slate-500 text-white border border-slate-600 rounded-md">
                    {formState === CreatePostFormState.LOADING ? (
                        <Loader2Icon className="stroke-text animate-spin" />
                    ) : (
                        <span>Create post</span>
                    )}
                </Form.Submit>
            </div>
        </Form.Root>
    );
}
