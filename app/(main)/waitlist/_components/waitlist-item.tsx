import type { WaitlistEntry } from "@/app/api/types"
import { BodySm, Caption, H3 } from "@/components/typography"
import { Button } from "@/components/button"
import { formatDate } from "@/utils/format-date"

interface WaitlistItemProps {
    entry: WaitlistEntry
    onViewStatus: (id: string) => void
}

export function WaitlistItem({ entry, onViewStatus }: WaitlistItemProps) {
    const zoneLabel = entry.zone === "any" ? "Tidak ada preferensi" : entry.zone

    return (
        <div className="bg-surface-2 border border-hair p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" />
                    <Caption className="uppercase tracking-widest text-muted">
                        Menunggu antrian
                    </Caption>
                </div>
                <Caption className="font-mono text-muted">
                    {entry.id}
                </Caption>
            </div>

            <div>
                <H3>{formatDate(entry.date)}</H3>
                <BodySm>
                    Pukul {entry.time} · {entry.guestCount} orang
                </BodySm>
            </div>

            <div className="flex gap-8 pt-3 border-t border-hair">
                <div>
                    <BodySm>Zona</BodySm>
                    <p className="text-ink capitalize">{zoneLabel}</p>
                </div>
                <div>
                    <BodySm>Atas nama</BodySm>
                    <p className="text-ink">{entry.guestName}</p>
                </div>
            </div>

            <div className="flex justify-end">
                <Button variant="outline" onClick={() => onViewStatus(entry.id)}>
                    Lihat Status
                </Button>
            </div>
        </div>
    )
}
