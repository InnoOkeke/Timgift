import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple in-memory rate limiter (resets on server restart — good enough for a single-admin app)
const attempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(request: Request): string {
    return request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
    const ip = getRateLimitKey(request);
    const now = Date.now();
    const record = attempts.get(ip);

    if (record) {
        if (now - record.firstAttempt < WINDOW_MS) {
            if (record.count >= MAX_ATTEMPTS) {
                return NextResponse.json(
                    { error: "Too many login attempts. Try again in 15 minutes." },
                    { status: 429 }
                );
            }
            record.count++;
        } else {
            // Window expired, reset
            attempts.set(ip, { count: 1, firstAttempt: now });
        }
    } else {
        attempts.set(ip, { count: 1, firstAttempt: now });
    }

    let body: { password?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { password } = body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN;

    if (!ADMIN_PASSWORD || !SESSION_TOKEN) {
        console.error("ADMIN_PASSWORD or ADMIN_SESSION_TOKEN env vars not set.");
        return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
        return NextResponse.json({ success: false }, { status: 401 });
    }

    // Clear rate limit on successful login
    attempts.delete(ip);

    (await cookies()).set("admin_session", SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
    });

    return NextResponse.json({ success: true });
}
