"use client"

import { useConfirmation } from "./_hooks/use-confirmation"
import { ConfirmationDetail } from "./_components/confirmation-detail"
import { ConfirmationActions } from "./_components/confirmation-actions"

export default function ConfirmationPage() {
    const {
        reservation,
        isLoading,
        isCancelling,
        error,
        cancelReservation,
        goToReserve,
        goToMyReservations,
    } = useConfirmation()
    
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!reservation) return <p>Reservation not found.</p>

    return (
        <div>
            <ConfirmationDetail reservation={reservation} />
            <ConfirmationActions
                status={reservation.status}
                isCancelling={isCancelling}
                onCancel={cancelReservation}
                onNewReservation={goToReserve}
                onViewReservations={goToMyReservations}
            />
        </div>
    )
}