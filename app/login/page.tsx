"use client"

import { H2 } from "@/components/typography/headings";
import { Caption } from "@/components/typography/misc";
import LoginForm from "./_components/login-form";

export default function LoginPage() {

    return (
        <div className="h-screen w-full flex items-center justify-center">
            {/* card login */}
            <div className="w-[400px] h-[400px] bg-surface-2 p-5 flex flex-col gap-5">
                <div>
                    <Caption>SIGN IN</Caption>
                    <H2>Welcome Back.</H2>
                </div>
                <LoginForm/>
            </div>
        </div>
    )
}