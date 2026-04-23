"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import type { TableRecommendation } from "@/lib/table-algorithm"

interface RecommendationsResponse {
    recommendations: TableRecommendation[]
    message?: string
    suggestWaitlist?: boolean
}

interface ReservationFormState {
    date: string
    time: string
    guestCount: number
    zone: string
}

export function useReservationForm() {
    const router = useRouter()

    const [form, setForm] = useState<ReservationFormState>({
        date: "",
        time: "",
        guestCount: 2,
        zone: "",
    })

    const [recommendations, setRecommendations] = useState<TableRecommendation[]>([])
    const [message, setMessage] = useState("")
    const [suggestWaitlist, setSuggestWaitlist] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    function updateForm(field: keyof ReservationFormState, value: string | number) {
        setForm((prev) => ({ ...prev, [field]: value }))
        setRecommendations([])
        setMessage("")
        setSuggestWaitlist(false)
    }

    async function searchTables() {
        if (!form.date) {
            setError("Pilih tanggal dulu.")
            return
        }
        if (!form.time) {
            setError("Pilih waktu dulu.")
            return
        }
        if (form.guestCount < 1) {
            setError("Jumlah tamu minimal 1.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const params = new URLSearchParams({
                date: form.date,
                time: form.time,
                guests: form.guestCount.toString(),
                ...(form.zone && { zone: form.zone }),
            })

            const data = await apiFetch<RecommendationsResponse>(
                `/api/tables/available?${params}`
            )

            setRecommendations(data.recommendations)
            setMessage(data.message ?? "")
            setSuggestWaitlist(data.suggestWaitlist ?? false)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    async function selectTable(recommendation: TableRecommendation) {
        setIsLoading(true)
        setError("")

        try {
            const data = await apiFetch<{ reservation: { id: string } }>(
                "/api/reservations",
                {
                    method: "POST",
                    body: {
                        date: form.date,
                        time: form.time,
                        guestCount: form.guestCount,
                        zone: form.zone || undefined,
                        tableIds: recommendation.tables.map((t) => t.id),
                    },
                }
            )

            router.push(`/confirmation/${data.reservation.id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    async function joinWaitlist() {
        setIsLoading(true)
        setError("")

        try {
            const data = await apiFetch<{ entry: { id: string } }>("/api/waitlist", {
                method: "POST",
                body: {
                    guestCount: form.guestCount,
                    date: form.date,
                    time: form.time,
                    zone: form.zone || undefined,
                },
            })

            router.push(`/waitlist?id=${data.entry.id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        form,
        updateForm,
        recommendations,
        message,
        suggestWaitlist,
        isLoading,
        error,
        searchTables: () => { void searchTables() },
        selectTable: (rec: TableRecommendation) => { void selectTable(rec) },
        joinWaitlist: () => { void joinWaitlist() },
    }
}