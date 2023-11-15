"use client";

import { Database } from "@/backend/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    async function login(formData: FormData) {
        const supabase = createClientComponentClient<Database>();
        
        const email = formData.get("email")!.toString();
        const password = formData.get("password")!.toString();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error);
        }

        console.log(JSON.stringify(data, null, 2));

        router.refresh();
    }

    return (
        <form className="flex flex-col" action={login}>
            <h1 className="text-4xl font-bold">Login</h1>

            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
            </div>

            <button type="submit" className="bg-gold text-white">Login</button>
        </form>
    );
}
