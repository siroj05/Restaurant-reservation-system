export type UserLoginModel = {
    email: string
    password: string
}

export type UserModel = {
    id: string
    name: string
    username: string
    email: string
    phone: string
    avatarPlaceholder: string
}

export interface TableModel {
    id: string
    capacity: number
    zone: string
    position: { x: number, y: number }
    adjacentTo: string[]
    label: string
}

export interface ReservationModel {
    id: string
    userId: string
    guestName: string
    guestCount: number
    tableIds: string[]
    date: string
    time: string
    zone: string
    status: "confirmed" | "waitlisted" | "cancelled"
}

export interface RestaurantModel {
    name: string
    address: string
    openTime: string
    closeTime: string
    reservationDuration: number
    cleanupBuffer: number
    maxPartySize: number
    description: string
}

export interface WaitlistEntry {
    id: string
    userId: string
    guestName: string
    guestCount: number
    date: string
    time: string
    zone: string
    createdAt: string
}


