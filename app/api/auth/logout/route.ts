import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Call backend logout endpoint
        const res = await fetch(
            `http://${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/logout`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${(await cookies()).get("token")?.value || ""}`
                }
            }
        );

        // Clear frontend cookie regardless of backend response
        (await cookies()).delete("token");

        return NextResponse.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout error:", err);
        // Still clear cookie on error
        (await cookies()).delete("token");
        return NextResponse.json({ message: "Logged out successfully" });
    }
}