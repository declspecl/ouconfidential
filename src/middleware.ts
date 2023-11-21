import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Database } from "@/backend/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req: request, res: response });
    const { data: session, error } = await supabase.auth.getSession();

    if (error) {
        console.error(error);
    }

    // logged in
    if (session && session.session && session.session.user) {
        if (request.nextUrl.pathname === "/login") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    else {
        if (request.nextUrl.pathname.endsWith("/create") || request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/account")
            return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
}
