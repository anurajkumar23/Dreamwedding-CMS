import Caterer from "@/models/caterer";
import { connectToDB } from "@/utils/database";
import { handleGetById } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const requestData = await req.json();
    const updatedData = await Caterer.findByIdAndUpdate(id, requestData, {
      new: true,
    });
    if (!updatedData) {
      return new NextResponse("Caterer not found", { status: 404 });
    }
    return NextResponse.json({
      message: "success",
      data: { "caterer": updatedData },
    });
  } catch (error: any) {
    console.error(`Error updating Caterer:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const deletedData = await Caterer.findByIdAndDelete(id);
    if (!deletedData) {
      return new NextResponse("Caterer not found", { status: 404 });
    }
    return NextResponse.json({
      message: "success",
      data: { caterer: deletedData },
    });
  } catch (error: any) {
    console.error(`Error deleting Caterer:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await handleGetById(Caterer, id, "caterer");
  return user;
}
