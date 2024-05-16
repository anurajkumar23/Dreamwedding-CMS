import Banquet from "@/models/banquet";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
connectToDB();

export async function handleNewFolderPatch(id: string, newGalleryObject: { name: string; photos: string[] }) {
  try {
    const updatedItem = await Banquet.findOneAndUpdate(
      { _id: id },
      { $push: { gallery: newGalleryObject } },
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return new NextResponse("Banquet not found", { status: 404 });
    }

    return NextResponse.json({
      message: "success",
      data: { banquet: updatedItem },
    });
  } catch (error: any) {
    console.error("Error updating Banquet:", error);
    return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
  }
}