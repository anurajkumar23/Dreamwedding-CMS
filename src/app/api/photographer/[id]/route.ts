import photographerMiddleware from "@/app/middleware/Photographer/PhotographerMiddleware";
import Photographer from "@/models/photographer";
import { connectToDB } from "@/utils/database";
import { handleDelete, handleGet, handlePatch, handlePost } from "@/utils/request";


import { NextRequest, NextResponse } from "next/server";

connectToDB()


export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    const photographer = await handleDelete(Photographer, id, "photographer");
    return photographer;
  }


  export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const updatedData = await photographerMiddleware(req)
      const photogrpher = await handlePatch(Photographer, id, "photographer" ,updatedData );
      return photogrpher;
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
  }