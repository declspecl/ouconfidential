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
                boardPictureRef.current.value = "";
            }

            setFormState(CreateBoardFormState.DONE);
        }
    }

	return (
        <Form.Root className={cn("min-w-[42rem] flex flex-col gap-2 text-text text-base", className)} action={createBoardClientAction}>
            <div className="w-full flex flex-col items-start gap-2">
                <Form.Field name="boardName" className="w-full flex flex-col">
                    <div className="flex flex-row justify-between gap-16">
                        <Form.Label className="text-lg">Board name <span className="text-rose">*</span></Form.Label>

                        <div className="flex flex-col items-center">
                            <Form.Message className="break-words whitespace-normal" match="valueMissing">Please enter the name of the board</Form.Message>
                            <Form.Message className="break-words whitespace-normal" match={(value) => value.length > 20}>Board name must be less than 20 characters</Form.Message>
                            <Form.Message className="break-words whitespace-normal" match={(value) => value.match(/^[a-z0-9-]+$/) === null}>Board name must only be lowercase letters, numbers, and dashes</Form.Message>
                        </div>
                    </div>

                    <Form.Control
                        type="text"
                        ref={boardNameRef}
                        placeholder="general"
                        required
                        className={cn(
                            "px-2 py-1 rounded-md border text-base"
                        )}
                    />
                </Form.Field>

                <Form.Field name="boardDescription" className="w-full flex flex-col">
                    <div className="flex flex-row justify-between gap-16">
                        <Form.Label className="text-lg">Board description <span className="text-rose">*</span></Form.Label>

                        <div className="flex flex-col items-center">
                            <Form.Message className="break-words whitespace-normal" match="valueMissing">Please enter the board&apos; description</Form.Message>
                        </div>
                    </div>

                    <Form.Control
                        type="text"
                        ref={boardDescriptionRef}
                        placeholder="What is your board about? What will you be talking about here?"
                        required
                        asChild
                    >
                        <textarea className="px-2 py-1 min-h-[5em] border border-gray-400 text-base resize-y" />
                    </Form.Control>
                </Form.Field>

                <Form.Field name="boardPicture" className="w-full">
                    <div className="w-full flex flex-row justify-between gap-16">
                        <Form.Label className="text-lg">Board picture <span className="text-rose">*</span></Form.Label>

                        <Form.Message match="valueMissing">Please add a picture for the board</Form.Message>
                    </div>

                    <Form.Control ref={boardPictureRef} type="file" accept="image/png, image/jpeg" required />
                </Form.Field>
            </div>

            <div className="flex flex-col items-center gap-2">
                {formState !== CreateBoardFormState.LOADING && (
                    <>
                        {error ? (
                            <p>{error}</p>
                        ) : error === null && (
                            <p>Board created successfully!</p>
                        )}
                    </>
                )}

                <Form.Submit disabled={formState === CreateBoardFormState.LOADING} className="px-4 py-1.5 bg-slate-500 text-black border border-slate-600 rounded-md">
                    {formState === CreateBoardFormState.LOADING ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <span>Create board</span>
                    )}
                </Form.Submit>
            </div>
        </Form.Root>
    );
}
