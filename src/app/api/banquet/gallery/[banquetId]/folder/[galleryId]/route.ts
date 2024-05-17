import GalleryMiddleware from "@/app/middleware/Banquet/GalleryMiddleware";
import { NextRequest, NextResponse } from "next/server";
import { handleFolderPatch } from "./handleFolderPatch";



export async function PATCH(req: NextRequest, { params }: { params: { banquetId: string , galleryId:string} }) {
    try {
      const { banquetId,galleryId } = params;
    
      // console.log("🚀 ~ PATCHGallery MIddleware~ id:", banquetId,galleryId )
      const newGalleryObject = await GalleryMiddleware(req,"banquet")
      const banquet = await handleFolderPatch(banquetId,galleryId, newGalleryObject );
      return banquet;
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
  }
