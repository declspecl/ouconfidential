"use client";

import { cn } from "@/lib/utils";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "@/actions/account";
import * as Form from "@radix-ui/react-form";
import { useOptimistic, useRef, useState } from "react";
import Link from "next/link";

enum LoginFormState {
    IDLE,
    LOADING,
    DONE
}

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const [formState, setFormState] = useOptimistic<LoginFormState>(LoginFormState.IDLE);

    const [error, setError] = useState<string | null | undefined>(undefined);

    const router = useRouter();

    async function loginClientAction(formData: FormData) {
        const email = formData.get("email") as string | null;
        const password = formData.get("password") as string | null;

        if (!email || !password) {
            setError("Please enter your email and password");

            return;
        }

        setFormState(LoginFormState.LOADING);

        const error = await signIn(email, password);

        setFormState(LoginFormState.DONE);

        if (error) {
            setError(error);
        }
        else {
            setError(null);

            emailRef.current.value = "";
            passwordRef.current.value = "";

            router.push("/");
            router.refresh();
        }
    }

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="text-gold">Log in</h1>

                <h4>
                    Don&apos;t have an account?&nbsp;
                    
                    <Link href="/signup" className="inline-flex flex-row items-center gap-1 text-rose underline">
                        Sign up here!
                        
                        <ExternalLinkIcon />
                    </Link>
                </h4>
            </div>

            <Form.Root className="w-full flex flex-col gap-2 text-text text-base" action={loginClientAction}>
                <div className="w-full flex flex-col items-start gap-3">
                    <Form.Field name="email" className="w-full flex flex-col gap-1">
                        <Form.Label className="text-lg">Email <span className="text-love">*</span></Form.Label>

                        <Form.Control
                            type="email"
                            autoComplete="email"
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
                            autoComplete="current-password"
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
                    {formState !== LoginFormState.LOADING && (
                        <>
                            {error ? (
                                <p className="text-gold">{error}</p>
                            ) : error === null && (
                                <p className="text-gold">Logged in successfully! Redirecting you...</p>
                            )}
                        </>
                    )}

                    <Form.Submit
                        disabled={formState === LoginFormState.LOADING}
                        className={cn(
                            "px-4 py-1.5 bg-rose text-rp-base font rounded-md transition-[filter]",
                            "hover:brightness-105"
                        )}
                    >
                        {formState === LoginFormState.LOADING ? (
                            <Loader2 className="animate-spin stroke-rp-base" />
                        ) : (
                            <span className="text-lg">Log in</span>
                        )}
                    </Form.Submit>
                </div>
            </Form.Root>
        </div>
    );
}
