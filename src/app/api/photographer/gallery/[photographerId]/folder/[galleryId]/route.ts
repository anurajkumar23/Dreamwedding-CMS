import GalleryMiddleware from "@/app/middleware/Banquet/GalleryMiddleware";
import { NextRequest, NextResponse } from "next/server";
import { handleFolderPatch } from "./handleFolderPatch";



export async function PATCH(req: NextRequest, { params }: { params: { photographerId: string , galleryId:string} }) {
    try {
      const { photographerId,galleryId } = params;
    
      
      const newGalleryObject = await GalleryMiddleware(req,"photographer")
      const photographer= await handleFolderPatch(photographerId,galleryId, newGalleryObject );
      return photographer;
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
  }
