import photographerMiddleware from "@/app/middleware/Photographer/PhotographerMiddleware";
import Photographer from "@/models/photographer";
import { connectToDB } from "@/utils/database";
import { handleGet, handlePost } from "@/utils/request";


import { NextRequest, NextResponse } from "next/server";

connectToDB()

export async function GET(){
 
    const photographer = await handleGet(Photographer, "photographer");

    return photographer;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const updatedData = await photographerMiddleware(req)
    const photographer = await handlePost(Photographer, updatedData, "photographer");
    return photographer
  }
