import { NextResponse, type NextRequest } from "next/server"
import { store } from "@/lib/server-store"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const userId = req.cookies.get("userId")?.value

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entry = store.waitlist.find((w) => w.id === id)

    if (!entry) {
        return NextResponse.json(
            { error: "Waitlist entry not found" },
            { status: 404 }
        )
    }

    if (entry.userId !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const queueForSlot = store.waitlist
        .filter((w) => w.date === entry.date && w.time === entry.time)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const position = queueForSlot.findIndex((w) => w.id === entry.id) + 1
    const estimatedWaitMinutes = (position - 1) * 120

    return NextResponse.json(
        {
            entry,
            position,
            estimatedWaitMinutes,
        },
        { status: 200 }
    )
}