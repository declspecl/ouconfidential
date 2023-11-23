"use client";

import { useRef, useState, useOptimistic } from "react";
import { cn } from "@/lib/utils";
import * as Form from "@radix-ui/react-form";
import { Loader2 } from "lucide-react";
import { createComment } from "@/actions/comments";
import { useRouter } from "next/navigation";

enum CreateCommentFormState {
    IDLE,
    LOADING,
    DONE
}

interface CreateCommentFormProps {
    postID: string
}

export function CreateCommentForm({ postID }: CreateCommentFormProps) {
    const commentContentRef = useRef<HTMLTextAreaElement>(null!);

    const [error, setError] = useState<string | null | undefined>(undefined);

    const [formState, setFormState] = useOptimistic<CreateCommentFormState>(CreateCommentFormState.IDLE);

    const router = useRouter();

    async function createCommentClientAction(formData: FormData) {
        if (formState !== CreateCommentFormState.LOADING) {
            setFormState(CreateCommentFormState.LOADING);

            const { error: createCommentError } = await createComment(formData);

            setError(createCommentError);

            if (!createCommentError) {
                commentContentRef.current.value = "";
            }

            setFormState(CreateCommentFormState.DONE);

            router.refresh();
        }
    }

    return (
        <Form.Root className="flex flex-col gap-2" action={createCommentClientAction}>
            <Form.Field name="content" className="w-full flex flex-col gap-1">
                <Form.Control
                    type="text"
                    placeholder="What would you like to say?"
                    required
                    asChild
                >
                    <textarea ref={commentContentRef} className={cn(
                        "px-2.5 py-1.5 min-h-[6em] border border-muted border-opacity-60 bg-surface rounded-md resize-y",
                        "placeholder:text-subtle",
                    )}/>
                </Form.Control>

                <div className="flex flex-col text-love">
                    <Form.Message match="valueMissing">Please enter comment&apos;s content</Form.Message>
                </div>
            </Form.Field>

            <input type="hidden" name="postID" value={postID} />

            <div className="flex flex-col items-center gap-3">
                {formState !== CreateCommentFormState.LOADING && (
                    <>
                        {error ? (
                            <p className="text-gold">{error}</p>
                        ) : error === null && (
                            <p className="text-gold">Comment created successfully!</p>
                        )}
                    </>
                )}

                <Form.Submit
                    disabled={formState === CreateCommentFormState.LOADING}
                    className={cn(
                        "px-4 py-1.5 bg-rose text-rp-base rounded-md transition-[filter]",
                        "hover:brightness-105"
                    )}
                >
                    {formState === CreateCommentFormState.LOADING ? (
                        <Loader2 className="animate-spin stroke-rp-base" />
                    ) : (
                        <span>Post comment</span>
                    )}
                </Form.Submit>
            </div>
        </Form.Root>
    );
}
