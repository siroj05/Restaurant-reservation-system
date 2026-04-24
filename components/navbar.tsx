"use client"
import { HandPlatter, Menu, X } from "lucide-react";
import { H3 } from "./typography";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthGuard } from "@/lib/auth-guard";
import Link from "next/link";

const NAV_ITEMS = [
    { label: "Reserve", href: "/reserve" },
    { label: "My Reservation", href: "/my-reservations" },
    { label: "Waitlist", href: "/waitlist" },
] as const

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const { user, logout } = useAuthStore((state) => state)
    const [menuOpen, setMenuOpen] = useState(false)

    const isAuth = useAuthGuard()

    if (!isAuth) return null

    const handleLogout = () => {
        setMenuOpen(false)
        logout()
        router.push("/login")
    }

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const handleCloseMenu = () => {
        setMenuOpen(false)
    }

    return (
        <div className="w-full bg-surface px-4 sticky top-0 z-50">

            <div className="flex justify-between items-center h-14">
                <div className="flex gap-2 items-center">
                    <HandPlatter />
                    <H3>Restaurant</H3>
                </div>
                <div className="hidden lg:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                href={item.href}
                                key={item.href}
                                className={
                                    isActive
                                        ? "border-b p-3 text-ink"
                                        : "p-3 text-muted hover:border-b hover:text-ink"
                                }
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
                <div className="hidden lg:flex gap-2 items-center">
                    <span className="text-sm">{user?.name}</span>
                    <div className="relative">
                        <button
                            onClick={handleMenuToggle}
                            className="bg-ink w-10 h-10 rounded-full flex items-center justify-center text-surface"
                        >
                            {user?.name.slice(0, 1).toUpperCase()}
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-12 bg-surface border border-hair shadow-md p-2 w-32">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-2 py-1 text-red-500 hover:text-red-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={handleMenuToggle} className="p-2 lg:hidden">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {menuOpen && (
                <div className="lg:hidden absolute top-14 left-0 w-full bg-surface flex flex-col pb-4 gap-1 shadow-md">
                    <div className="px-3 py-2 text-sm text-muted">
                        Halo, {user?.name}
                    </div>
                    <hr />
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                href={item.href}
                                key={item.href}
                                onClick={handleCloseMenu}
                                className={
                                    isActive
                                        ? "px-3 py-2 text-ink font-semibold border-l-2 border-ink"
                                        : "px-3 py-2 text-muted hover:text-ink"
                                }
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                    <hr />
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 text-left text-red-500 hover:text-red-700"
                    >
                        Logout
                    </button>
                </div>
            )}

        </div>
    )
}