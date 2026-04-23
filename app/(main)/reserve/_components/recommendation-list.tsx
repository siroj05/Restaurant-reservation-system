"use client"

import type { TableRecommendation } from "@/lib/table-algorithm"
import { RecommendationCard } from "./recommendation-card"
import { H3 } from "@/components/typography"
import { Button } from "@/components/button"


interface RecommendationListProps {
    recommendations: TableRecommendation[]
    message: string
    suggestWaitlist: boolean
    isLoading: boolean
    onSelect: (recommendation: TableRecommendation) => void
    onJoinWaitlist: () => void
}

export function RecommendationList({
    recommendations,
    message,
    suggestWaitlist,
    isLoading,
    onSelect,
    onJoinWaitlist,
}: RecommendationListProps) {
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (recommendations.length === 0 && !message) {
        return null
    }
    
    // ini buat kalau ga ada rekomendasi lain karna penuh dia diarahkan ke join waitlist
    if (recommendations.length === 0 && message) {
        return (
            <div>
                <p>{message}</p>
                {suggestWaitlist && (
                    <Button onClick={onJoinWaitlist}>Join Waitlist</Button>
                )}
            </div>
        )
    }

    return (
        <div className="my-5">
            <H3>Tabel Tersedia</H3>
            <div className="">
                {recommendations.map((rec, index) => (
                    <RecommendationCard
                        key={rec.tables.map((t) => t.id).join("-")}
                        recommendation={rec}
                        rank={index + 1}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    )
}