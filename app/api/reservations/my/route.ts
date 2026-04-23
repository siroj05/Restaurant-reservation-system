import { NextResponse, type NextRequest } from "next/server"
import { store } from "@/lib/server-store"

export async function GET(req: NextRequest) {
    const userId = req.cookies.get("userId")?.value

    if(!userId){
        return NextResponse.json({ error: "Unauthorized" }, { status : 401 })
    }

    const myReservations = store.reservations.filter(
        (r) => r.userId === userId
    )

    return NextResponse.json({reservations : myReservations}, {status : 200})
}