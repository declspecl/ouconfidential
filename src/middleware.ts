import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import { Database } from "./backend/database.types";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
        return res;
    }
    else if (sessionData.session) {
        // if user is signed in and the current path is /login redirect the user to /
        if (sessionData.session.user && req.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // if user is not signed in and the current path is not / redirect the user to /
        if (!sessionData.session.user && req.nextUrl.pathname !== "/login") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ["/", "/login"]
};
