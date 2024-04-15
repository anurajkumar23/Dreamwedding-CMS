import User from "@/models/user";
import { NextResponse,NextRequest } from "next/server";

export async function GET() {
    try {
        const user = await User.find();
        return NextResponse.json({ message: "success", data: user });
    } catch (error:any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}

export async function POST(req:NextRequest, res:NextResponse) {
    try {
        const data = await req.json();
        console.log(data)
        const user = await User.create(data);
        return NextResponse.json({ message: "success", data: user });
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}
