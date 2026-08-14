import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
        const adminSession = request.cookies.get("admin_session");

        // Allow access to login page
        if (request.nextUrl.pathname === "/admin/login") {
            if (adminSession?.value === process.env.ADMIN_SESSION_TOKEN) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            return NextResponse.next();
        }

        // Reject unauthenticated users
        if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_TOKEN) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
