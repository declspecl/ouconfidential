"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState, useOptimistic, useRef } from "react";
import * as Form from "@radix-ui/react-form";
import { createBoard } from "@/actions/boards";

enum CreateBoardFormState {
    IDLE,
    LOADING,
    DONE,
}

interface CreateBoardFormProps {
    className?: string;
}

export function CreateBoardForm({ className }: CreateBoardFormProps) {
    const boardNameRef = useRef<HTMLInputElement>(null!);
    const boardDescriptionRef = useRef<HTMLInputElement>(null!);
    const boardPictureRef = useRef<HTMLInputElement>(null!);

    const [formState, setFormState] = useOptimistic<CreateBoardFormState>(CreateBoardFormState.IDLE);

    const [error, setError] = useState<string | null | undefined>(undefined);

    async function createBoardClientAction(formData: FormData) {
        if (formState !== CreateBoardFormState.LOADING) {
            setFormState(CreateBoardFormState.LOADING);

            const { error } = await createBoard(formData);

            setError(error);

            if (!error) {
                boardNameRef.current.value = "";
                boardDescriptionRef.current.value = "";
                boardPictureRef.current.value = "";
            }

            setFormState(CreateBoardFormState.DONE);
        }
    }

	return (
        <Form.Root className={cn("w-full flex flex-col gap-2 text-text text-base", className)} action={createBoardClientAction}>
            <div className="w-full flex flex-col items-start gap-3">
                <Form.Field name="boardName" className="w-full flex flex-col gap-1">
                    <Form.Label className="text-lg">Board name <span className="text-love">*</span></Form.Label>

                    <Form.Control
                        type="text"
                        ref={boardNameRef}
                        placeholder="general"
                        required
                        className={cn(
                            "px-2.5 py-1.5 border border-muted border-opacity-60 bg-surface rounded-md",
                            "placeholder:text-subtle",
                        )}
                    />

                    <div className="flex flex-col items-start text-love">
                        <Form.Message match="valueMissing">Please enter the name of the board</Form.Message>
                        <Form.Message match={(value) => value.length > 20}>Board name must be less than 20 characters</Form.Message>
                        <Form.Message match={(value) => value.match(/^[a-z0-9-]+$/) === null}>Board name must only be lowercase letters, numbers, and dashes</Form.Message>
                    </div>
                </Form.Field>

                <Form.Field name="boardDescription" className="w-full flex flex-col gap-1">
                    <Form.Label className="text-lg">Board description <span className="text-love">*</span></Form.Label>

                    <Form.Control
                        type="text"
                        ref={boardDescriptionRef}
                        placeholder="What is your board about? What will you be talking about here?"
                        required
                        asChild
                    >
                        <textarea className={cn(
                            "px-2.5 py-1.5 min-h-[6em] border border-muted border-opacity-60 bg-surface rounded-md resize-y",
                            "placeholder:text-subtle",
                        )}/>
                    </Form.Control>

                    <div className="flex flex-col text-love">
                        <Form.Message match="valueMissing">Please enter the board&apos;s description</Form.Message>
                    </div>
                </Form.Field>

                <Form.Field name="boardPicture" className="w-full flex flex-col gap-1">
                    <Form.Label className="text-lg">Board picture <span className="text-love">*</span></Form.Label>

                    <Form.Control ref={boardPictureRef} type="file" accept="image/png, image/jpeg" required />

                    <div className="flex flex-col text-love">
                        <Form.Message match="valueMissing">Please add a picture for the board</Form.Message>
                    </div>
                </Form.Field>
            </div>

            <div className="flex flex-col items-center gap-3">
                {formState !== CreateBoardFormState.LOADING && (
                    <>
                        {error ? (
                            <p className="text-gold">{error}</p>
                        ) : error === null && (
                            <p className="text-gold">Board created successfully!</p>
                        )}
                    </>
                )}

                <Form.Submit
                    disabled={formState === CreateBoardFormState.LOADING}
                    className={cn(
                        "px-4 py-2 bg-rose text-rp-base font rounded-md transition-[filter]",
                        "hover:brightness-105"
                    )}
                >
                    {formState === CreateBoardFormState.LOADING ? (
                        <Loader2 className="animate-spin stroke-rp-base" />
                    ) : (
                        <span className="text-lg">Create board</span>
                    )}
                </Form.Submit>
            </div>
        </Form.Root>
    );
}
