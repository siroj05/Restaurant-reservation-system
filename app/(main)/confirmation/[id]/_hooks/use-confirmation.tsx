"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import type { ReservationModel } from "@/app/api/types"

interface ConfirmationResponse {
    reservation: ReservationModel
}

export function useConfirmation() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [reservation, setReservation] = useState<ReservationModel | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCancelling, setIsCancelling] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchReservation() {
            try {
                const data = await apiFetch<ConfirmationResponse>(
                    `/api/reservations/${id}`
                )
                console.log("data = ", data)
                setReservation(data.reservation)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong")
            } finally {
                setIsLoading(false)
            }
        }

        void fetchReservation()
    }, [id])

    async function cancelReservation() {
        if (!reservation) return
        setIsCancelling(true)
        setError("")

        try {
            await apiFetch(`/api/reservations/${reservation.id}`, {
                method: "DELETE",
            })
            router.push("/my-reservations")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsCancelling(false)
        }
    }

    return {
        reservation,
        isLoading,
        isCancelling,
        error,
        cancelReservation: () => { void cancelReservation() },
        goToReserve: () => router.push("/reserve"),
        goToMyReservations: () => router.push("/my-reservations"),
    }
}