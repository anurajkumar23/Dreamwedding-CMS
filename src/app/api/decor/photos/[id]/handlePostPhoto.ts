
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Decorator from "@/models/decorator";
connectToDB();

export async function handlePostPhoto(id: string, newGalleryObject:{ photos: string[] }) {
  try {
    const updatedItem = await Decorator.findOneAndUpdate(
        { _id: id },
        { photos: newGalleryObject.photos }, 
        { new: true, runValidators: true }
      );
    
    if (!updatedItem) {
      return new NextResponse("Banquet not found", { status: 404 });
    }

    return NextResponse.json({
      message: "success",
      data: { decorator: updatedItem },
    });
  } catch (error: any) {
    console.error("Error updating Banquet:", error);
    return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
  }
}