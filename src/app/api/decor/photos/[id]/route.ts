import GalleryMiddleware from "@/app/middleware/Banquet/GalleryMiddleware";
import DecoratorMiddleware from "@/app/middleware/decor/DecorMiddleware";
import Decorator from "@/models/decorator";
import { NextRequest, NextResponse } from "next/server";
import { handlePatchPhoto } from "./handlePatchPhoto";



export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      console.log("🚀 ~ PATCHGallery MIddleware~ id:", id)
      const newGalleryObject = await GalleryMiddleware(req,"decorator")

      const decorator = await handlePatchPhoto(id, newGalleryObject );
      return decorator;
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
  }

 