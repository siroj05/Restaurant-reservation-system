import type { ReservationModel, TableModel } from "@/app/api/types"

export interface TableRecommendation {
  tables: TableModel[]
  totalCapacity: number
  excessCapacity: number
  isMerged: boolean
  reason: string
}

function timeToMinutes(time : string):number{
    const [hours, minutes] = time.split(".").map(Number)
    return hours * 60 + minutes
}

export function isTableAvailable(
    tableId : string,
    date : string,
    requestedTime : string,
    reservations : ReservationModel[]
):boolean{
    const requested = timeToMinutes(requestedTime)
    const BLOCK_DURATION = 120

    return !reservations.some((rsv) => {
        if(rsv.status == "cancelled" || rsv.date !== date) return false
        if(!rsv.tableIds.includes(tableId)) return false

        const rsvStart = timeToMinutes(rsv.time)
        const rsvEnd = rsvStart + BLOCK_DURATION

        return requested < rsvEnd && requested + BLOCK_DURATION > rsvStart
    })
}

export function findBestFitTables(
    tables : TableModel[],
    reservations : ReservationModel[],
    gusetCount : number,
    date : string,
    time : string,
    zone? : string
): TableModel[]{

    const zoneFiltered = zone ? tables.filter((t) => t.zone === zone) : tables

    const available = zoneFiltered.filter((t) =>
        isTableAvailable(t.id, date, time, reservations)
    )

    const sufficient = available.filter((t) => t.capacity >= gusetCount)

    sufficient.sort((a, b) => a.capacity - b.capacity)

    return sufficient
}

export function findMergedTables(
    tables : TableModel[],
    reservations : ReservationModel[],
    guestCount : number,
    date : string,
    time : string,
    zone? : string
):TableModel[][]{
    
    const zoneFiltered = zone ? tables.filter((t) => t.zone === zone) : tables
    const available = zoneFiltered.filter((t) => 
        isTableAvailable(t.id, date, time, reservations)
    )

    const validCombinations : TableModel[][] = []

    for (const table of available){

        const neighbors = table.adjacentTo.map((id) => available.find((t) => t.id === id)).filter((t) : t is TableModel => t !== undefined)

        for (const neighbor of neighbors){
            const combo = [table, neighbor]
            const totalCapacity = combo.reduce((sum, t) => sum + t.capacity, 0)

            if(totalCapacity >= guestCount){
                const ids = combo.map((t) => t.id).sort()
                const alreadyAdded = validCombinations.some(
                    (c) => c.map((t) => t.id).sort().join() === ids.join()
                )
                if(!alreadyAdded) validCombinations.push(combo)
            }
        }
    }

    validCombinations.sort((a, b) => {
        const excessA = a.reduce((sum, t) => sum + t.capacity, 0) - guestCount
        const excessB = b.reduce((sum, t) => sum + t.capacity, 0) - guestCount
        return excessA - excessB 
    })  
    
    return validCombinations
}

export function getTableRecommendations(
    tables : TableModel[],
    reservations : ReservationModel[],
    guestCount : number,
    date : string,
    time : string,
    zone? : string
): TableRecommendation[]{

    const results : TableRecommendation[] = []

    const singleTables = findBestFitTables(
        tables, reservations, guestCount, date, time, zone
    )

    for(const table of singleTables){
        const excess = table.capacity - guestCount
        results.push({
            tables : [table],
            totalCapacity : table.capacity,
            excessCapacity : excess,
            isMerged : false,
            reason : excess === 0 ?
                `${table.label} available for ${guestCount} guest.` :
                `${table.label} adalah meja terkecil yang tersedia untuk ${guestCount} tamu (kapasitas ${table.capacity})`
        })
    }

    if(results.length === 0){
        const merged = findMergedTables(
            tables, reservations, guestCount, date, time, zone
        )

        for(const combo of merged){
            const total = combo.reduce((sum, t) => sum + t.capacity, 0)
            const excess = total - guestCount
            const labels = combo.map((t) => t.label).join(" + ")
            results.push({
                tables : combo,
                totalCapacity : total,
                excessCapacity : excess,
                isMerged : true,
                reason : `${labels} digabung untuk mengakomodasi ${guestCount} tamu (total kapasitas ${total})`
            })
        }
    }

    return results
}