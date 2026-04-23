"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import type { ReservationModel, TableModel } from "@/app/api/types"

interface MyReservationsResponse {
  reservations: ReservationModel[]
}

interface TablesResponse {
  tables: TableModel[]
}

export function useMyReservations() {
  const router = useRouter()

  const [reservations, setReservations] = useState<ReservationModel[]>([])
  const [tables, setTables] = useState<TableModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const [rsvData, tablesData] = await Promise.all([
          apiFetch<MyReservationsResponse>("/api/reservations/my"),
          apiFetch<TablesResponse>("/api/tables"),
        ])
        setReservations(rsvData.reservations)
        setTables(tablesData.tables)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [])

  async function cancelReservation(id: string) {
    setCancellingId(id)
    setError("")

    try {
      await apiFetch(`/api/reservations/${id}`, { method: "DELETE" })
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setCancellingId(null)
    }
  }

  function getTableLabels(tableIds: string[]): string {
    return tableIds
      .map((tid) => tables.find((t) => t.id === tid)?.label ?? tid)
      .join(" + ")
  }

  return {
    reservations,
    isLoading,
    cancellingId,
    error,
    getTableLabels,
    cancelReservation: (id: string) => { void cancelReservation(id) },
    goToReserve: () => router.push("/reserve"),
    goToConfirmation: (id: string) => router.push(`/confirmation/${id}`),
  }
}