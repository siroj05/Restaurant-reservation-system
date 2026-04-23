"use client"

import { useReservationForm } from "./_hooks/use-reservation-form"
import { ReservationForm } from "./_components/reservation-form"
import { RecommendationList } from "./_components/recommendation-list"

export default function ReservePage() {
    const reservationForm = useReservationForm()

    return (
        <main>
            <ReservationForm
                form={reservationForm.form}
                onUpdate={reservationForm.updateForm}
                onSearch={reservationForm.searchTables}
                isLoading={reservationForm.isLoading}
                error={reservationForm.error}
            />

            <RecommendationList
                recommendations={reservationForm.recommendations}
                message={reservationForm.message}
                suggestWaitlist={reservationForm.suggestWaitlist}
                isLoading={reservationForm.isLoading}
                onSelect={reservationForm.selectTable}
                onJoinWaitlist={reservationForm.joinWaitlist}
            />
        </main>
    )
}