import type { ReservationModel, TableModel, WaitlistEntry, RestaurantModel, UserModel } from "@/app/api/types";
import reservationData from "@/app/api/data/reservations.json"
import tablesData from "@/app/api/data/tables.json"
import restaurantData from "@/app/api/data/restaurant.json"
import usersData from "@/app/api/data/users.json"
declare global {
    var __store: {
        reservations: ReservationModel[]
        tables: TableModel[]
        restaurant: RestaurantModel
        users: UserModel[]
        waitlist: WaitlistEntry[]
    } | undefined
}

const seedReservations: ReservationModel[] = (
    reservationData as unknown as Omit<ReservationModel, "status">[]
).map((r) => ({ ...r, status: "confirmed" as const }))

// Kalau global store belum ada, buat baru — kalau sudah ada, pakai yang lama
global.__store ??= {
    reservations: seedReservations,
    tables: tablesData as unknown as TableModel[],
    restaurant: restaurantData as unknown as RestaurantModel,
    users: usersData as unknown as UserModel[],
    waitlist: [] as WaitlistEntry[],
}

export const store = global.__store