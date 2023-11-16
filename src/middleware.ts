import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import { Database } from "./backend/database.types";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req: request, res: response });
    const { data: { session: session}, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
    }

    if (session) {
        if (session.user) {
            if (request.nextUrl.pathname === "/login")
                return NextResponse.redirect(new URL("/", request.url));
        }
        else {
            if (request.nextUrl.pathname === "/")
                return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    else {
        if (request.nextUrl.pathname === "/")
            return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
}

export const config = {
    matcher: ["/", "/login"]
};
