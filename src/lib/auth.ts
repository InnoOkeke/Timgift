import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Call at the top of any admin-only API route.
 * Returns a 401 response if the session is invalid, otherwise returns null (meaning OK).
 */
export async function requireAdminSession(): Promise<NextResponse | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    const expectedToken = process.env.ADMIN_SESSION_TOKEN;

    if (!session || !expectedToken || session.value !== expectedToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
}
