"use client";

import { signUp } from "@/actions/account";
import { cn } from "@/lib/utils";
import * as Form from "@radix-ui/react-form";
import { Loader2 } from "lucide-react";
import { useEffect, useOptimistic, useRef, useState } from "react";

enum SignUpFormState {
    IDLE,
    LOADING,
    DONE
}

export default function SignUp() {
    const emailRef = useRef<HTMLInputElement>(null!);
    const grizzIDRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const [error, setError] = useState<string | null | undefined>(undefined);

    const [formState, setFormState] = useOptimistic<SignUpFormState>(SignUpFormState.IDLE);

    async function signUpClientAction(formData: FormData) {
        if (formState !== SignUpFormState.LOADING) {
            const email = formData.get("email") as string | null;
            const grizzID = formData.get("grizzID") as string | null;
            const password = formData.get("password") as string | null;

            if (!email || !grizzID || !password) {
                setError("Please enter your email, grizz ID, and password");

                return;
            }

            setFormState(SignUpFormState.LOADING);

            const signUpError = await signUp(email, password, grizzID);

            if (signUpError)
                setError(signUpError);
            else {
                emailRef.current.value = "";
                grizzIDRef.current.value = "";
                passwordRef.current.value = "";
            }

            setFormState(SignUpFormState.DONE);
        }
    }

    return (
        <div className="flex flex-col gap-12">
            <h1 className="text-rose">Sign up</h1>

            <Form.Root className="w-full flex flex-col gap-2 text-text text-base" action={signUpClientAction}>
                <div className="w-full flex flex-col items-start gap-3">
                    <Form.Field name="grizzID" className="w-full flex flex-col gap-1">
                        <Form.Label className="text-lg">Grizz ID <span className="text-love">*</span></Form.Label>

                        <Form.Control
                            type="text"
                            ref={grizzIDRef}
                            placeholder="G-12345678"
                            required
                            className={cn(
                                "px-2.5 py-1.5 border border-muted border-opacity-60 bg-surface rounded-md",
                                "placeholder:text-subtle",
                            )}
                        />

                        <div className="flex flex-col items-start text-love">
                            <Form.Message match="valueMissing">Please enter your grizz ID</Form.Message>
                            <Form.Message match={(value) => value.match(/^G-[0-9]{8}$/) === null}>Please properly enter your grizz ID</Form.Message>
                        </div>
                    </Form.Field>

                    <Form.Field name="email" className="w-full flex flex-col gap-1">
                        <Form.Label className="text-lg">Email <span className="text-love">*</span></Form.Label>

                        <Form.Control
                            type="email"
                            ref={emailRef}
                            placeholder="fullname@oakland.edu"
                            required
                            className={cn(
                                "px-2.5 py-1.5 border border-muted border-opacity-60 bg-surface rounded-md",
                                "placeholder:text-subtle",
                            )}
                        />

                        <div className="flex flex-col items-start text-love">
                            <Form.Message match="valueMissing">Please enter your email</Form.Message>
                            <Form.Message match="typeMismatch">Please properly enter your email</Form.Message>
                        </div>
                    </Form.Field>

                    <Form.Field name="password" className="w-full flex flex-col gap-1">
                        <Form.Label className="text-lg">Password <span className="text-love">*</span></Form.Label>

                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            placeholder="••••••••••••"
                            required
                            className={cn(
                                "px-2.5 py-1.5 border border-muted border-opacity-60 bg-surface rounded-md",
                                "placeholder:text-subtle",
                            )}
                        />

                        <div className="flex flex-col text-love">
                            <Form.Message match="valueMissing">Please enter your password</Form.Message>
                        </div>
                    </Form.Field>
                </div>

                <div className="flex flex-col items-center gap-3">
                    {formState !== SignUpFormState.LOADING && (
                        <>
                            {error ? (
                                <p className="text-gold">{error}</p>
                            ) : error === null && (
                                <p className="text-gold">Signed up successfully! Redirecting you...</p>
                            )}
                        </>
                    )}

                    <Form.Submit
                        disabled={formState === SignUpFormState.LOADING}
                        className={cn(
                            "px-4 py-2 bg-rose text-rp-base font rounded-md transition-[filter]",
                            "hover:brightness-105"
                        )}
                    >
                        {formState === SignUpFormState.LOADING ? (
                            <Loader2 className="animate-spin stroke-rp-base" />
                        ) : (
                            <span className="text-lg">Sign up</span>
                        )}
                    </Form.Submit>
                </div>
            </Form.Root>
        </div>
    );
}
