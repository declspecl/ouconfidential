import { createClient } from "@/backend/utils";
import { cookies } from "next/headers";
import { useRouter } from "next/router";

export default function Login() {
    async function login(formData: FormData) {
        "use server";

        const supabase = createClient(cookies());
        
        const email = formData.get("email")!.toString();
        const password = formData.get("password")!.toString();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error);
        }
        else {
            useRouter().events
        }

        console.log(JSON.stringify(data, null, 2));
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
