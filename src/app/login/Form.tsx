import React from "react";

import { cookies } from "next/headers";
import { createClient } from "@/backend/utils";

interface FormProps {
    children: React.ReactNode
}

export default function Form() {
    async function login(grizzID: string, email: string, password: string) {
        "use server";

        console.log(email, grizzID, password);

        const supabase = createClient(cookies());
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error);
        }
        else {
            console.log(data);
        }
    }

    return (
        <form className="flex flex-col" onSubmit={(event) => {
            event.preventDefault();

            login(grizzID, email, password)
                .then((response) => {
                    console.log(response);

                    setGrizzID("");
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => {
                    console.error(error);
                })
        }}>

        </form>
    );
}
