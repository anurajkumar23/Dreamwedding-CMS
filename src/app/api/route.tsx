import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

connectToDB();

export async function GET(){
     return NextResponse.json({
        message:"All Good"
     })
}