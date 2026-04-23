"use client"

import { Button } from "@/components/button"
import { BodySm, Caption, H1, H4 } from "@/components/typography"
import type { TableRecommendation } from "@/lib/table-algorithm"

interface RecommendationCardProps {
    recommendation: TableRecommendation
    rank: number
    onSelect: (recommendation: TableRecommendation) => void
}

export function RecommendationCard({
    recommendation,
    rank,
    onSelect,
}: RecommendationCardProps) {
    const zone = recommendation.tables[0].zone
    return (
        <div className="border-hair border-1 bg-surface-2 hover:bg-surface py-2 px-5 flex">
            {/* urutan rank */}
            <div className="flex justify-between w-full">
                <div className="flex gap-2">
                    <div className="my-auto">
                        <H1>#{rank}</H1>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <H4>{recommendation.tables[0].id.toUpperCase()}</H4>
                            <div className="border px-2 rounded-full">
                                <Caption>
                                    {zone}
                                </Caption>
                            </div>
                            <div className="border px-2 rounded-full">
                                <Caption>Kapasitas {recommendation.totalCapacity}</Caption>
                            </div>
                        </div>
                        {recommendation.isMerged && <span>Merged Table</span>}

                        <BodySm>{recommendation.reason}</BodySm>
                    </div>
                </div>
                
                <div className="flex">
                    <Button onClick={() => onSelect(recommendation)}>
                        Reservasi
                    </Button>
                </div>
            </div>
        </div>
    )
}