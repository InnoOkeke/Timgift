import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    // In production, this should be an environment variable like process.env.ADMIN_PASSWORD
    // For this setup, we'll use a default strong password or env
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

    if (password === ADMIN_PASSWORD) {
        // Set a cookie to verify session
        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
