import Seller from "@/models/seller";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

connectToDB();

export async function GET(){
   const banquet = await Seller.find({})
}