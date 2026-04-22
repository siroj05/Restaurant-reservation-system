"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth"
import type { UserModel } from "@/app/api/types"
import { Button } from "@/components/button";
import { Input } from "@/components/inputs";
import { Label } from "@/components/label";
import { LoaderCircle } from "lucide-react"

export default function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)
    const { login } = useAuthStore((state) => state)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setIsPending(true)

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json() as { user?: UserModel, error?: string }

        if (!res.ok || !data.user) {
            setError(data.error ?? "Login gagal.")
            setIsPending(false)
            return
        }
        login(data.user)
        router.push("/reserve")
    }

    return (
        <form onSubmit={(e) => { void handleSubmit(e) }} className="space-y-4">
            <div>
                <Label text="Email" />
                <Input type="email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <Label text="Password" />
                <Input type="password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button
                disabled={isPending}
                type="submit"
                className="w-full mt-5">
                {
                    isPending ?
                        <div className="flex justify-center">
                            <LoaderCircle className="animate-spin" />
                            Process..
                        </div>
                        : "Login"
                }
            </Button>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>
    )
}