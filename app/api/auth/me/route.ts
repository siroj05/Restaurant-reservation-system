import { NextResponse, type NextRequest } from "next/server"
import { store } from "@/lib/server-store"

export async function GET(req: NextRequest) {
    const userId = req.cookies.get("userId")?.value

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = store.users.find((u) => u.id === userId)
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password: _, ...safeUser } = user as typeof user & { password: string }

    return NextResponse.json({ user: safeUser }, { status: 200 })
}