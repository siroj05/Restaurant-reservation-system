"use client"

import { Button } from "@/components/button"
import { InputDate, InputTime } from "@/components/inputs"
import { Label } from "@/components/label"
import { LoaderIcon } from "lucide-react"

interface ReservationFormProps {
    form: {
        date: string
        time: string
        guestCount: number
        zone: string
    }
    onUpdate: (field: "date" | "time" | "guestCount" | "zone", value: string | number) => void
    onSearch: () => void
    isLoading: boolean
    error: string
}

export function ReservationForm({
    form,
    onUpdate,
    onSearch,
    isLoading,
    error,
}: ReservationFormProps) {
    return (
        <div className="bg-surface p-3 border-hair border-1">
            <div className="space-y-4">
                {/* DATE */}
                <div className="flex flex-col">
                    <Label text="Tanggal" />
                    <InputDate
                        value={form.date}
                        onChange={(e) => onUpdate("date", e.target.value)}
                    />
                </div>

                {/* TIME */}
                <div className="flex flex-col">
                    <Label text="Waktu" />
                    <InputTime
                        type="time"
                        value={form.time}
                        onChange={(e) => onUpdate("time", e.target.value)}
                    />
                </div>

                {/* GUEST COUNT */}
                <div className="flex flex-col">
                    <Label text="Jumlah tamu" />
                    <div className="flex gap-2">
                        <Button className="px-3" onClick={() => onUpdate("guestCount", Math.max(1, form.guestCount - 1))}>-</Button>
                        <span className="my-auto">{form.guestCount}</span>
                        <Button className="px-3" onClick={() => onUpdate("guestCount", Math.min(12, form.guestCount + 1))}>+</Button>
                    </div>
                </div>

                {/* ZONE */}
                <div className="flex flex-col">
                    <Label text="Zona" />
                    <div className="flex flex-wrap gap-2">
                        {["", "indoor", "outdoor", "private"].map((z) => {
                            const isSelected = form.zone === z
                            const label = z === "" ? "No Preference" : z.charAt(0).toUpperCase() + z.slice(1)

                            return (
                                <label
                                    key={z}
                                    className={`
                flex items-center gap-2 px-4 py-2 border cursor-pointer
                transition-all duration-150 select-none text-sm font-medium
                ${isSelected
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                                        }
            `}
                                >
                                    <input
                                        type="radio"
                                        name="zone"
                                        value={z}
                                        checked={isSelected}
                                        onChange={() => onUpdate("zone", z)}
                                        className="sr-only"
                                    />
                                    {label}
                                </label>
                            )
                        })}
                    </div>
                </div>

                {/* SUBMIT */}
                <Button onClick={onSearch} disabled={isLoading}>
                    {isLoading ?
                        <div className="flex">
                            <LoaderIcon />
                            <p>Mencari...</p>
                        </div>
                        :
                        "Cari meja"
                    }
                </Button>

                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        </div>
    )
}