import Banquet from "@/models/banquet";
import { connectToDB } from "@/utils/database";

import { handleGet, handlePost } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

connectToDB()

export async function GET(){
 
    const banquet = await handleGet(Banquet, "banquet");

    return banquet;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const banquet = await handlePost(Banquet, req, "banquet","restricted", ["rating","like","contactUs","reviews"]);
    return banquet
  }

 
  