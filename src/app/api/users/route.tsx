import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";

connectToDB();

export async function GET() {
    try {
        const users = await User.find();
        return NextResponse.json({ message: "success",length:users.length, data: {users} });
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password, username, image, role } = await req.json(); 

        if (!email ) {
            return new NextResponse("Email ID is required", { status: 400 });
        }

        if (!password ) {
            return new NextResponse("Password is required", { status: 400 });
        }

        if (!username ) {
            return new NextResponse("UserName is required", { status: 400 });
        }
        
        const user = await User.create({
            email,
            password,
            username,
            image,
            role,
        });

        return NextResponse.json({ message: "success", data: user });
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}

