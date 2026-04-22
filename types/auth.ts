import type { UserModel } from "@/app/api/types"

export interface loginPayload {
    username : string
    password : string
}

export interface loginResponse {
    user? : UserModel
    error? : string
}