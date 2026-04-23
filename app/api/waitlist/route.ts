import { NextResponse, type NextRequest } from "next/server"
import { store } from "@/lib/server-store"

export async function POST(req: NextRequest) {
    const userId = req.cookies.get("userId")?.value

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json() as {
        guestCount: number
        date: string
        time: string
        zone?: string
    }

    const { guestCount, date, time, zone } = body

    if (!guestCount || !date || !time) {
        return NextResponse.json(
            { error: "guestCount, date, and time are required" },
            { status: 400 }
        )
    }

    const user = store.users.find((u) => u.id === userId)
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const alreadyWaiting = store.waitlist.find(
        (w) => w.userId === userId && w.date === date && w.time === time
    )

    if (alreadyWaiting) {
        return NextResponse.json(
            { error: "Kamu sudah ada di waitlist untuk slot ini." },
            { status: 409 }
        )
    }

    const newEntry = {
        id: `wl-${Date.now()}`,
        userId,
        guestName: user.name,
        guestCount,
        date,
        time,
        zone: zone ?? "any",
        createdAt: new Date().toISOString(),
    }

    store.waitlist.push(newEntry)

    const position = store.waitlist.filter(
        (w) => w.date === date && w.time === time
    ).length

    const estimatedMinutes = (position - 1) * 120

    return NextResponse.json(
        {
            entry: newEntry,
            position,
            estimatedWaitMinutes: estimatedMinutes,
        },
        { status: 201 }
    )
}