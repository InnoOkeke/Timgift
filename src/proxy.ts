import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Disguise any /admin requests completely — return 404 so probes find nothing
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        return NextResponse.rewrite(new URL("/_not-found", request.url));
    }

    // Protect hidden /company/admin routes
    if (pathname.startsWith("/company/admin")) {
        const adminSession = request.cookies.get("admin_session");

        // Allow access to login page
        if (pathname === "/company/admin/login") {
            if (adminSession?.value === process.env.ADMIN_SESSION_TOKEN) {
                return NextResponse.redirect(new URL("/company/admin", request.url));
            }
            return NextResponse.next();
        }

        // Reject unauthenticated users
        if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_TOKEN) {
            return NextResponse.redirect(new URL("/company/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/company/admin/:path*", "/admin/:path*", "/admin"],
};
