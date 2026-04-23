import type { ReservationModel } from "@/app/api/types"
import { BodySm, H1 } from "@/components/typography"
import { formatDate } from "@/utils/format-date"

interface ConfirmationDetailProps {
    reservation: ReservationModel
}

const STATUS_META: Record<
    ReservationModel["status"],
    { dot: string; label: string; tone: string }
> = {
    confirmed: { dot: "bg-ink", label: "Terkonfirmasi", tone: "text-ink" },
    waitlisted: { dot: "bg-muted", label: "Waitlist", tone: "text-muted" },
    cancelled: { dot: "bg-hair", label: "Dibatalkan", tone: "text-muted line-through" },
}

export function ConfirmationDetail({ reservation }: ConfirmationDetailProps) {
    const status = STATUS_META[reservation.status]

    return (
        <section className="space-y-8">
            <header className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <span
                        className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] ${status.tone}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                        {reservation.id}
                    </span>
                </div>

                <div className="space-y-2">
                    <H1>Konfirmasi Reservasi</H1>
                    <BodySm>
                        Terima kasih, {reservation.guestName}. Simpan halaman ini sebagai bukti reservasi kamu.
                    </BodySm>
                </div>

                <hr className="border-hair" />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 border border-hair bg-hair gap-px">
                <DetailTile label="Tanggal" value={formatDate(reservation.date)} />
                <DetailTile label="Jam" value={reservation.time} mono />
                <DetailTile label="Tamu" value={`${reservation.guestCount} orang`} />
            </div>

            <dl className="border-t border-hair">
                <DetailRow label="Zona" value={capitalize(reservation.zone)} />
                <DetailRow
                    label={reservation.tableIds.length > 1 ? "Meja" : "Meja"}
                    value={reservation.tableIds.join("  ·  ")}
                    mono
                />
            </dl>
        </section>
    )
}

interface DetailTileProps {
    label: string
    value: string
    mono?: boolean
}

function DetailTile({ label, value, mono }: DetailTileProps) {
    return (
        <div className="bg-surface p-6 flex flex-col gap-3">
            <span className="text-[11px] uppercase text-muted">
                {label}
            </span>
            <span
                className={`text-2xl font-semibold ${mono ? "font-mono " : ""}`}
            >
                {value}
            </span>
        </div>
    )
}

interface DetailRowProps {
    label: string
    value: string
    mono?: boolean
}

function DetailRow({ label, value, mono }: DetailRowProps) {
    return (
        <div className="flex justify-between gap-6 py-4 border-b border-hair">
            <dt className="text-xs uppercase tracking-[0.22em] text-muted">{label}</dt>
            <dd className={`text-base text-ink ${mono ? "font-mono" : ""}`}>{value.toUpperCase()}</dd>
        </div>
    )
}

function capitalize(value: string) {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1)
}
