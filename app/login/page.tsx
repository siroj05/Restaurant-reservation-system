"use client"

import { Caption, H2 } from "@/components/typography";
import LoginForm from "./_components/login-form";
import { useAuthGuard } from "@/lib/auth-guard";

export default function LoginPage() {
    useAuthGuard()
    return (
        <div className="h-screen w-full flex items-center justify-center">
            {/* card login */}
            <div className="w-[400px] h-[400px] bg-surface-2 p-5 flex flex-col gap-5">
                <div>
                    <Caption>SIGN IN</Caption>
                    <H2>Welcome Back.</H2>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}