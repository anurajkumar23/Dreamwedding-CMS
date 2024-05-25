import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Photographer from "@/models/photographer";

connectToDB();

export async function handlePatchPhoto(id: string, newGalleryObject: { photos: string[] }) {
  try {
    const updatedItem = await Photographer.findOneAndUpdate(
      { _id: id },
      { $push: { photos: { $each: newGalleryObject.photos } } },
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