import type { ReservationModel } from "@/app/api/types"
import { BodySm, Caption, H3 } from "@/components/typography"
import { Button } from "@/components/button"
import { formatDate } from "@/utils/format-date"

interface ReservationItemProps {
    reservation: ReservationModel
    tableLabels: string
    isCancelling: boolean
    onCancel: (id: string) => void
    onViewDetail: (id: string) => void
}

export function ReservationItem({
    reservation,
    tableLabels,
    isCancelling,
    onCancel,
    onViewDetail,
}: ReservationItemProps) {
    return (
        <div className="bg-surface-2 border border-hair p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {reservation.status === "confirmed" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                    )}
                    {reservation.status === "waitlisted" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-muted" />
                    )}
                    {reservation.status === "cancelled" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-hair" />
                    )}
                    <Caption className="uppercase tracking-widest text-muted">
                        {reservation.status}
                    </Caption>
                </div>
                <Caption className="font-mono text-muted">
                    {reservation.id}
                </Caption>
            </div>

            <div>
                <H3>{formatDate(reservation.date)}</H3>
                <BodySm>
                    Pukul {reservation.time} · {reservation.guestCount} orang
                </BodySm>
            </div>

            <div className="flex gap-8 pt-3 border-t border-hair">
                <div>
                    <BodySm>Zona</BodySm>
                    <p className="text-ink capitalize">{reservation.zone}</p>
                </div>
                <div>
                    <BodySm>Meja</BodySm>
                    <p className="text-ink font-mono">{tableLabels}</p>
                </div>
            </div>

            <div className="flex gap-2 justify-end">
                <Button
                    variant="outline"
                    onClick={() => onViewDetail(reservation.id)}
                >
                    Lihat Detail
                </Button>
                {reservation.status === "confirmed" && (
                    <Button
                        variant="ghost"
                        onClick={() => onCancel(reservation.id)}
                        disabled={isCancelling}
                    >
                        {isCancelling ? "Membatalkan..." : "Batalkan"}
                    </Button>
                )}
            </div>
        </div>
    )
}
