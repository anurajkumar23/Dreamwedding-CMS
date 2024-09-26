import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function authMiddleware (request: Request){
    const BearerToken = request.headers.get("authorization") as string;

    if(!BearerToken){
        return new NextResponse(JSON.stringify({
         ErrorMessage: "Bearer token not defined"
        }))
    }
    const token = BearerToken.split(" ")[1];

    if(!token){
        return new NextResponse(JSON.stringify({
            errorMessage: "token not defined"
        }))
    }

    const signature = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
       await jose.jwtVerify(token, signature)
    } catch (error) {
        return new NextResponse(JSON.stringify({
            errorMessage: "Unauthorized request"
        }))
    }
}


