import { NextResponse, type NextRequest } from "next/server"
import { store } from "@/lib/server-store"
import { processWaitlist } from "@/lib/waitlist"

export async function DELETE(
    req: NextRequest,
    {
        params
    }: {
        params: { id: string }
    }
) {
    const userId = req.cookies.get("userId")?.value

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reservation = store.reservations.find((r) => r.id === params.id)

    if (!reservation) {
        return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    if (reservation.userId !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    reservation.status = "cancelled"

    processWaitlist(reservation.tableIds, reservation.date, reservation.time)

    return NextResponse.json(
        { message: "Reservation cancelled successfully" },
        { status: 200 }
    )
}