import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Decorator from "@/models/decorator";

connectToDB();

export async function handlePatchPhoto(id: string, newGalleryObject: { photos: string[] }) {
  try {
    const updatedItem = await Decorator.findOneAndUpdate(
      { _id: id },
      { $push: { photos: { $each: newGalleryObject.photos } } },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return new NextResponse("Decorator not found", { status: 404 });
    }

    return NextResponse.json({
      message: "success",
      data: { decorator: updatedItem },
    });
  } catch (error: any) {
    console.error("Error updating Decorator:", error);
    return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
  }
}