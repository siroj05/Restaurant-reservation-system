import { type UserModel } from "@/app/api/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
    user : UserModel | null
    isAuth : boolean
    login : (user : UserModel) => void
    logout : () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user : null,
            isAuth : false,
            login : (user : UserModel) => set({user, isAuth : true}),
            logout : () => set({user : null, isAuth : false})
        }),
        {
            name : "auth"
        }
    )
)