import banquetMiddleware from "@/app/middleware/Banquet/banquetMiddleware";
import Banquet from "@/models/banquet";
import { filter } from "@/utils/filterMiddleware";

import { handleDelete, handleGetById, handlePatch } from "@/utils/request";
import upload from "@/utils/upload";


import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedData = await banquetMiddleware(req)
    const banquet = await handlePatch(Banquet, id, "banquet" ,updatedData );
    return banquet;
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

  export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    const user = await handleDelete(Banquet, id, "banquet");
    return user;
  }

  
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    const user = await handleGetById(Banquet, id, "banquet");
    return user;
  }


