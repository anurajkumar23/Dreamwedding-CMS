import Banquet from "@/models/banquet";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

connectToDB();

export interface GalleyData{
    name:string
    photos:string[]
    _id:string
}

export async function handleFolderPatch(banquetId: string, galleryId: string, newGalleryObject: { name: string; photos: string[] }) {
  try {
    const banquet = await Banquet.findById(banquetId);

    if (!banquet) {
      return new NextResponse("Banquet not found", { status: 404 });
    }

    console.log(galleryId, "galleryId");

    const gallery = banquet.gallery.find((item:GalleyData) =>  item._id.toString() === galleryId
    );
    console.log(" ~ handleFolderPatch ~ gallery:", gallery);

    if (!gallery) {
      return new NextResponse("Gallery not found", { status: 404 });
    }
    gallery.photos.push(...newGalleryObject.photos);
    await banquet.save();
    return NextResponse.json({ message: "success", data: { gallery } });

  } catch (error: any) {
    console.error("Error updating Banquet:", error);
    return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
  }
}
