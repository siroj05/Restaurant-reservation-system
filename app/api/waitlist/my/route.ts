import { NextResponse, type NextRequest } from "next/server"
import { store } from "@/lib/server-store"

export async function GET(req: NextRequest) {
    const userId = req.cookies.get("userId")?.value

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const myWaitlist = store.waitlist.filter((w) => w.userId === userId)

    return NextResponse.json({ waitlist: myWaitlist }, { status: 200 })
}