import { store } from "@/lib/server-store";
import { getTableRecommendations } from "@/lib/table-algorithm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const { searchParams } = new URL(req.url)
    
    const date = searchParams.get("date")
    const time = searchParams.get("time")
    const guests = searchParams.get("guests")
    const zone = searchParams.get("zone") ?? undefined

    if(!date || !time || !guests){
        return NextResponse.json(
            { error : "date, time, and guests are required" },
            { status : 400 }
        )
    }

    const guestCount = parseInt(guests)

    if(isNaN(guestCount) || guestCount < 1){
        return NextResponse.json(
            { error : "guests must be a valid number" },
            { status : 400 }
        )
    }

    if(guestCount > store.restaurant.maxPartySize){
        return NextResponse.json(
            { error : `Maximum party size is ${store.restaurant.maxPartySize}`},
            { status : 400 }
        )
    }

    const recommendations = getTableRecommendations(
        store.tables,
        store.reservations,
        guestCount,
        date,
        time,
        zone
    )

    if(recommendations.length === 0){
        const hasOtherZones = zone ? 
            getTableRecommendations(
                store.tables,
                store.reservations,
                guestCount,
                date,
                time,
                undefined
            ).length > 0 : false
        
        return NextResponse.json(
            {
                recommendations : [],
                message : hasOtherZones ?
                `Tidak ada meja tersedia di zone ${zone}, tapi ada pilihan di zona lain.` 
                : `Tidak ada meja tersedia untuk waktu ini. Kamu bisa bergabung ke waitlist.`,
                suggestWaitlist : true,
            },
            {
                status : 200
            }
        )
    }
    return NextResponse.json({recommendations}, {status : 200})
}