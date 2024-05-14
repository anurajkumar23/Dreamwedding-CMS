
import Photographer from "@/models/photographer";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
connectToDB();
export async function handleNewFolderPatch(id: string, newGalleryObject: { name: string; photos: string[] }) {
  try {
    const updatedItem = await Photographer.findOneAndUpdate(
      { _id: id },
      { $push: { gallery: newGalleryObject } },
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return new NextResponse("Photographer not found", { status: 404 });
    }

    return NextResponse.json({
      message: "success",
      data: { photographer: updatedItem },
    });
  } catch (error: any) {
    console.error("Error updating Photographer:", error);
    return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
  }
}
