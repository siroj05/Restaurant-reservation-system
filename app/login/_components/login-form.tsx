"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/button";
import { Input } from "@/components/inputs";
import { Label } from "@/components/label";
import { LoaderCircle } from "lucide-react"
import { LoginRequest } from "../_actions/login"

export default function LoginForm() {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)
    const { login } = useAuthStore((state) => state)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setIsPending(true)

        const data = await LoginRequest({username, password})

        if (!data.user) {
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
                <Label text="Username" />
                <Input type="text" className="w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
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