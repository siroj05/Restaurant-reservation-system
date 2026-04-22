import { apiFetch } from "@/lib/api";
import type { loginPayload, loginResponse } from "@/types/auth";


export async function LoginRequest(payload : loginPayload): Promise<loginResponse> {
    try {
        return await apiFetch<loginResponse>("/api/auth/login",{
            method : "POST",
            body : payload
        })
    } catch (error) {
        const message = error instanceof Error ? error.message : "Login failed."
        return { error : message }
    }
}