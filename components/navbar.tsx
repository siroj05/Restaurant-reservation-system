"use client"
import { HandPlatter } from "lucide-react";
import { Body, H3 } from "./typography";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/lib/auth-guard";

export default function Navbar() {
    const router = useRouter()
    const { user, logout } = useAuthStore((state) => state)
    const [open, setOpen] = useState<boolean>(false)

    const isAuth = useAuthGuard()

    if (!isAuth) return null

    const handleLogout = () => {
        setOpen(false)
        logout()
        router.push("/login")
    }

    return (
        <div className="w-full bg-surface px-4 flex justify-between">

            {/* left side */}
            <div className="flex gap-5">
                <div className="flex gap-2 my-auto">
                    <HandPlatter />
                    <H3>
                        Restaurant
                    </H3>
                </div>
                <div className="flex my-auto">
                    <div className="border-b p-3 text-ink">
                        Reserve
                    </div>
                    <div className="p-3 text-muted hover:border-b hover:text-ink">
                        My Reservation
                    </div>
                    <div className="p-3 text-muted hover:border-b hover:text-ink">
                        Waitlist
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className="flex gap-2">
                <Body className="my-auto">
                    {user?.name}
                </Body>
                <div className="my-auto relative">
                    <button onClick={() => setOpen(!open)} className="bg-ink w-10 h-10 rounded-full flex items-center justify-center my-auto text-center text-surface">
                        {user?.name.slice(0, 1).toUpperCase()}
                    </button>
                    {open &&
                        <div className="absolute bg-surface boder-ink border-1 p-2 right-0">
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}