import Banquet from "@/models/banquet";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

connectToDB();

export async function GET(){
   const banquet = await Banquet.find({})
}