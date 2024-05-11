import Banquet from "@/models/banquet";

import { handleDelete, handleGetById, handlePatch } from "@/utils/request";
import upload from "@/utils/upload";


import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Upload the file and get the filename
    const billboard = await upload(req, "banquet");
    console.log("🚀 ~ data:", billboard);
  
    const banquet = await handlePatch(Banquet, req, id, "banquet", "restricted", ["rating", "like", "contactUs", "reviews"]);
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

function xyz() {
  throw new Error("Function not implemented.");
}
