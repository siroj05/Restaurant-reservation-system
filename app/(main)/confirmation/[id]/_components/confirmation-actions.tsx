import { Button } from "@/components/button"

interface ConfirmationActionsProps {
  status: string
  isCancelling: boolean
  onCancel: () => void
  onNewReservation: () => void
  onViewReservations: () => void
}

export function ConfirmationActions({
  status,
  isCancelling,
  onCancel,
  onNewReservation,
  onViewReservations,
}: ConfirmationActionsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 my-6">
      <div>
        {status === "confirmed" && (
          <Button variant="ghost" onClick={onCancel} disabled={isCancelling}>
            {isCancelling ? "Membatalkan..." : "Batalkan reservasi"}
          </Button>
        )}
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-2">
        <Button variant="outline" onClick={onViewReservations}>
          Reservasiku
        </Button>
        <Button onClick={onNewReservation}>
          Buat reservasi lain
        </Button>
      </div>
    </div>
  )
}
