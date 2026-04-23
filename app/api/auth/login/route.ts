import { NextResponse, type NextRequest } from "next/server";
import type { UserModel } from "../../types";
import users from "../../data/users.json"

interface RawUser extends UserModel {
    password : string
}

export async function POST(req : NextRequest) {
    const body = await req.json() as { username : string, password : string }
    const { username, password } = body

    if(!username || !password) {
        return NextResponse.json(
            { error : "Username and password are required" },
            { status : 400 }
        )
    }

    const found = ( users as RawUser[]).find(u => u.username === username && u.password === password)

    if(!found){
        return NextResponse.json(
            { error : "Invalid username or password" },
            { status : 401 }
        )
    }

    const { password : _, ...safeUser } = found
    const res = NextResponse.json({user : safeUser}, {status : 200})
    res.cookies.set("userId", safeUser.id, {
        httpOnly : true,
        path : "/"
    })
    return res
}