import type { ReservationModel } from "@/app/api/types"
import { ReservationItem } from "./reservation-item"

interface ReservationListProps {
    reservations: ReservationModel[]
    cancellingId: string | null
    getTableLabels: (tableIds: string[]) => string
    onCancel: (id: string) => void
    onViewDetail: (id: string) => void
    onGoToReserve: () => void
}

export function ReservationList({
    reservations,
    cancellingId,
    getTableLabels,
    onCancel,
    onViewDetail,
    onGoToReserve,
}: ReservationListProps) {
    if (reservations.length === 0) {
        return (
            <div>
                <p>Belum ada reservasi.</p>
                <button onClick={onGoToReserve}>Buat Reservasi</button>
            </div>
        )
    }

    return (
        <div className="my-5 flex flex-col gap-4">
            {reservations.map((r) => (
                <ReservationItem
                    key={r.id}
                    reservation={r}
                    tableLabels={getTableLabels(r.tableIds)}
                    isCancelling={cancellingId === r.id}
                    onCancel={onCancel}
                    onViewDetail={onViewDetail}
                />
            ))}
        </div>
    )
}