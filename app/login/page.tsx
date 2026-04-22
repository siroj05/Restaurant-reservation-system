"use client"
import { Button } from "@/components/button";
import { Input } from "@/components/inputs";
import { Label } from "@/components/label";
import { H2 } from "@/components/typography/headings";
import { Caption } from "@/components/typography/misc";
// import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import type { UserModel } from "../api/types";
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {

    // const router = useRouter()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)

    async function handleSubmit(e:FormEvent) {
        e.preventDefault()
        setError(null)
        setIsPending(true)

        const res = await fetch("/api/auth/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email, password})
        })
        const data = await res.json() as { user? : UserModel, error? : string}
        console.log(data)
        if(!res.ok || !data.user){
            setError(data.error?? "Login gagal.")
            setIsPending(false)
            return
        }

        setIsPending(false)
    }

    return (
        <div className="h-screen w-full flex items-center justify-center">
            {/* card login */}
            <div className="w-[400px] h-[400px] bg-surface-2 p-5 flex flex-col gap-5">
                <div>
                    <Caption>SIGN IN</Caption>
                    <H2>Welcome Back.</H2>
                </div>
                <form onSubmit={(e) => {void handleSubmit(e)}} className="space-y-4">
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
                                isPending?
                                <div className="flex justify-center">
                                    <LoaderCircle className="animate-spin"/>
                                    Process..
                                </div>
                                : "Login"
                            }
                    </Button>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                </form>
            </div>
        </div>
    )
}