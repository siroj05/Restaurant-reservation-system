"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { apiFetch } from "@/lib/api"
import type { WaitlistEntry } from "@/app/api/types"

interface WaitlistPositionResponse {
    entry: WaitlistEntry
    position: number
    estimatedWaitMinutes: number
}

export function useWaitlist() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const waitlistId = searchParams.get("id")

    const [entry, setEntry] = useState<WaitlistEntry | null>(null)
    const [myWaitlist, setMyWaitlist] = useState<WaitlistEntry[]>([])
    const [position, setPosition] = useState<number>(0)
    const [estimatedWaitMinutes, setEstimatedWaitMinutes] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                if (waitlistId) {
                    const data = await apiFetch<WaitlistPositionResponse>(
                        `/api/waitlist/position/${waitlistId}`
                    )
                    setEntry(data.entry)
                    setPosition(data.position)
                    setEstimatedWaitMinutes(data.estimatedWaitMinutes)
                } else {
                    const data = await apiFetch<{ waitlist: WaitlistEntry[] }>(
                        "/api/waitlist/my"
                    )
                    setMyWaitlist(data.waitlist)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong")
            } finally {
                setIsLoading(false)
            }
        }

        void fetchData()
    }, [waitlistId])

    return {
        waitlistId,
        entry,
        myWaitlist,
        position,
        estimatedWaitMinutes,
        isLoading,
        error,
        goToReserve: () => router.push("/reserve"),
        goToMyReservations: () => router.push("/my-reservations"),
        goToWaitlistStatus: (id: string) => router.push(`/waitlist?id=${id}`),
    }
}