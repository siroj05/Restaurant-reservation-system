"use client"

import { Suspense } from "react"
import { useWaitlist } from "./_hooks/use-waitlist"
import { WaitlistStatus } from "./_components/waitlist-status"
import { WaitlistItem } from "./_components/waitlist-item"
import { Body, H1 } from "@/components/typography"
import { Button } from "@/components/button"

function WaitlistContent() {
    const {
        waitlistId,
        entry,
        myWaitlist,
        position,
        estimatedWaitMinutes,
        isLoading,
        error,
        goToReserve,
        goToMyReservations,
        goToWaitlistStatus,
    } = useWaitlist()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    if (waitlistId && !entry) return <p>Data waitlist tidak ditemukan.</p>

    if (waitlistId && entry) {
        return (
            <div>
                <H1>Kamu ada di waitlist</H1>
                <hr className="border-hair mt-2" />
                <WaitlistStatus
                    entry={entry}
                    position={position}
                    estimatedWaitMinutes={estimatedWaitMinutes}
                    onGoToReserve={goToReserve}
                    onGoToMyReservations={goToMyReservations}
                />
            </div>
        )
    }

    return (
        <div>
            <H1>Waitlist Saya</H1>
            <hr className="border-hair mt-2" />

            {myWaitlist.length === 0 ? (
                <div className="my-5 bg-surface-2 border border-hair p-5 flex flex-col gap-4 items-start">
                    <Body className="text-muted">
                        Kamu tidak sedang dalam antrian waitlist.
                    </Body>
                    <Button onClick={goToReserve}>Buat Reservasi</Button>
                </div>
            ) : (
                <div className="my-5 flex flex-col gap-4">
                    {myWaitlist.map((w) => (
                        <WaitlistItem
                            key={w.id}
                            entry={w}
                            onViewStatus={() => void goToWaitlistStatus(w.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function WaitlistPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <WaitlistContent />
        </Suspense>
    )
}
