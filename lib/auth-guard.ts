"use client"

import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/router"
import { useEffect } from "react"

export function useAuthGuard(){
    const router = useRouter()
    const isAuth = useAuthStore((state) => state.isAuth)

    useEffect(() => {
        if(!isAuth){
            void router.replace("/login");
        }
    },[isAuth, router])

    return isAuth;
}