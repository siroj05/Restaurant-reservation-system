import type { ReservationModel, TableModel, WaitlistEntry, RestaurantModel } from "@/app/api/types";
import reservationData from "@/app/api/data/reservations.json"
import tablesData from "@/app/api/data/tables.json"
import restaurantData from "@/app/api/data/restaurant.json"
import usersData from "@/app/api/data/users.json"

const seedReservations: ReservationModel[] = (reservationData as unknown as Omit<ReservationModel, "status">[]).map((r) => ({
    ...r, status: "confirmed" as const
}))

export const store = {
    reservations: seedReservations,
    tables: tablesData as TableModel[],
    restaurant: restaurantData as RestaurantModel,
    users: usersData,
    waitlist: [] as WaitlistEntry[],
}