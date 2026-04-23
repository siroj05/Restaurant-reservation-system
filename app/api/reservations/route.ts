import { store } from "@/lib/server-store";
import { getTableRecommendations } from "@/lib/table-algorithm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    
    const userId = req.cookies.get("userId")?.value

    if(!userId){
        return NextResponse.json(
            {error : "Unauthorized"},
            {status : 401}
        )
    }

    const body = await req.json() as {
        date : string
        time : string
        guestCount : number
        zone ? : string
        tableIds? : string[]
    }

    const { date, time, guestCount, zone, tableIds } = body

    if(!date || !time || !guestCount) {
        return NextResponse.json(
            { error : "date, time, and guestCount are required" },
            { status : 400 }
        )
    }

    const user = store.users.find((u) => u.id === userId)
    if(!user){
        return NextResponse.json(
            { error : "User not found" },
            { status : 404 }
        )
    }

    let assignedTableIds : string[] = []

    if(tableIds && tableIds.length > 0){
        const recommendations = getTableRecommendations(
            store.tables,
            store.reservations,
            guestCount,
            date,
            time,
            zone
        )

        const stillAvailable = recommendations.some(
            (r) => r.tables.map((t) => t.id).sort().join() === [...tableIds].sort().join()
        )

        if(!stillAvailable){
            return NextResponse.json(
                { error : "Meja yang dipilih sudah tidak tersedia. Silahkan pilih ulang."},
                {status : 409}
            )
        }

        assignedTableIds = tableIds
    }else {
        const recommendations = getTableRecommendations(
            store.tables,
            store.reservations,
            guestCount,
            date,
            time,
            zone
        )

        if(recommendations.length === 0){
            return NextResponse.json(
                { error : "TIdak ada meja tersedia. Silahkan join waitlist."},
                { status : 409}
            )
        }

        assignedTableIds = recommendations[0].tables.map((t) => t.id)
    }

    const newReservation = {
        id: `rsv-${Date.now()}`,
        userId,
        guestName : user.name,
        guestCount,
        tableIds : assignedTableIds,
        date,
        time,
        zone : zone ?? store.tables.find((t) => t.id === assignedTableIds[0])?.zone ?? "indoor",
        status : "confirmed" as const
    }

    store.reservations.push(newReservation)

    return NextResponse.json(
        { reservation : newReservation },
        { status : 201}
    )
}