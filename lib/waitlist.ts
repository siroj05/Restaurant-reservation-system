import { store } from "@/lib/server-store"
import { isTableAvailable } from "@/lib/table-algorithm"

export function processWaitlist(
    freedTableIds: string[],
    date: string,
    time: string
): void {
    const relevant = store.waitlist.filter(
        (w) => w.date === date && w.time === time
    )

    if (relevant.length === 0) return

    for (const tableId of freedTableIds) {
        const table = store.tables.find((t) => t.id === tableId)
        if (!table) continue

        const match = relevant.find(
            (w) =>
                w.guestCount <= table.capacity &&
                isTableAvailable(tableId, date, time, store.reservations)
        )

        if (!match) continue

        const user = store.users.find((u) => u.id === match.userId)
        if (!user) continue

        store.reservations.push({
            id: `rsv-${Date.now()}`,
            userId: match.userId,
            guestName: user.name,
            guestCount: match.guestCount,
            tableIds: [tableId],
            date,
            time,
            zone: table.zone,
            status: "confirmed",
        })

        store.waitlist = store.waitlist.filter((w) => w.id !== match.id)
    }
}