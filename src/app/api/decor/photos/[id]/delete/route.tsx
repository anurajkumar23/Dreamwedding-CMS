import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Decorator from "@/models/decorator";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const deletePhotos = await req.json(); 

    console.log(deletePhotos, "delete photos");

    // Validate that deletePhotos is an array of strings
    if (!Array.isArray(deletePhotos) || deletePhotos.some(photo => typeof photo !== 'string')) {
      return NextResponse.json(
        { success: false, message: "Invalid data format for deletePhotos" },
        { status: 400 }
      );
    }

    console.log(deletePhotos, "Photos to delete");

    // Directory where the photos are stored
    const photosDirectory = path.join(process.cwd(), 'public', 'images', 'decorator', 'media');

    // Filter and delete photos
    const deleteResults = deletePhotos.map(photoName => {
      if (!photoName) {
        return { photoName, success: false, message: "Empty photo name" };
      }

      const imagePath = path.join(photosDirectory, photoName);
      console.log(imagePath, "image path");

      if (fs.existsSync(imagePath)) {
        try {
          // Delete the image file from the server's file system
          fs.unlinkSync(imagePath);
          console.log(`Deleted photo: ${imagePath}`);
          return { photoName, success: true };
        } catch (err) {
          console.error(`Error deleting photo ${photoName}:`, err);
          return { photoName, success: false, message: "Deletion error" };
        }
      } else {
        console.warn(`Photo not found: ${imagePath}`);
        return { photoName, success: false, message: "Photo not found" };
      }
    });
    const decor = await Decorator.findById(id)
    if (!decor) {
        return NextResponse.json(
          { success: false, message: "Decorator not found" },
          { status: 404 }
        );
      }
      
      // Filter photos to exclude those that are in the deletePhotos array
      const photos = decor.photos.filter((image:string) => !deletePhotos.includes(image));

      decor.photos=photos
      await decor.save()




    return NextResponse.json(
      { success: true, message: "Photos processed", results: deleteResults },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
