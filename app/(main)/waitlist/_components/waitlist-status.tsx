import type { WaitlistEntry } from "@/app/api/types"
import { Button } from "@/components/button"
import { Body, BodySm, Caption, Display, H3 } from "@/components/typography"
import { formatDate } from "@/utils/format-date"

interface WaitlistStatusProps {
    entry: WaitlistEntry
    position: number
    estimatedWaitMinutes: number
    onGoToReserve: () => void
    onGoToMyReservations: () => void
}

export function WaitlistStatus({
    entry,
    position,
    estimatedWaitMinutes,
    onGoToReserve,
    onGoToMyReservations,
}: WaitlistStatusProps) {

    const estimatedHours = Math.floor(estimatedWaitMinutes / 60)
    const estimatedMins = estimatedWaitMinutes % 60

    const estimatedLabel =
        estimatedWaitMinutes === 0
            ? "Kamu pertama di antrian!"
            : estimatedHours > 0
                ? `${estimatedHours} jam ${estimatedMins} menit`
                : `${estimatedMins} menit`

    const zoneLabel = entry.zone === "any" ? "Tidak ada preferensi" : entry.zone

    return (
        <div className="my-5 flex flex-col gap-4">
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
                <div className="flex items-end gap-3 pt-2">
                    <Display className="font-mono leading-none">
                        #{position}
                    </Display>
                    <BodySm className="pb-2">
                        posisi antrian kamu
                    </BodySm>
                </div>
                <div className="pt-3 border-t border-hair">
                    <BodySm>Estimasi waktu tunggu</BodySm>
                    <Body className="text-ink">{estimatedLabel}</Body>
                </div>
            </div>
            <div className="bg-surface-2 border border-hair p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Caption className="uppercase tracking-widest text-muted">
                        Detail permintaan
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
            </div>
            <Caption className="text-muted">
                Kami akan menghubungi kamu kalau meja sudah tersedia.
            </Caption>

            <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onGoToReserve}>
                    Cari waktu lain
                </Button>
                <Button onClick={onGoToMyReservations}>
                    Reservasiku
                </Button>
            </div>
        </div>
    )
}
