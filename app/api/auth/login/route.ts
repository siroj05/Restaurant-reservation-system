import { NextResponse, type NextRequest } from "next/server";
import type { UserModel } from "../../types";
import users from "../../data/users.json"

interface RawUser extends UserModel {
    password : string
}

export async function POST(req : NextRequest) {
    const body = await req.json() as { email : string, password : string }
    const { email, password } = body

    if(!email || !password) {
        return NextResponse.json(
            { error : "Email and password are required" },
            { status : 400 }
        )
    }

    const found = ( users as RawUser[]).find(u => u.email === email && u.password === password)

    if(!found){
        return NextResponse.json(
            { error : "Invalid email or password" },
            { status : 401 }
        )
    }

    const { password : _, ...safeUser } = found
    return NextResponse.json({user : safeUser}, {status : 200})
}