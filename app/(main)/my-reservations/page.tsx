"use client"


import { H1 } from "@/components/typography"
import { ReservationList } from "./_components/reservation-list"
import { useMyReservations } from "./_hook/use-my-reservations"

export default function MyReservationsPage() {
    const {
        reservations,
        isLoading,
        cancellingId,
        error,
        getTableLabels,
        cancelReservation,
        goToReserve,
        goToConfirmation,
    } = useMyReservations()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <H1>Reservasiku</H1>
            <hr className="border-hair mt-2"/>
            <ReservationList
                reservations={reservations}
                cancellingId={cancellingId}
                getTableLabels={getTableLabels}
                onCancel={cancelReservation}
                onViewDetail={goToConfirmation}
                onGoToReserve={goToReserve}
            />
        </div>
    )
}