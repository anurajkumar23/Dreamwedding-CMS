import GalleryMiddleware from "@/app/middleware/Banquet/GalleryMiddleware";
import Banquet from "@/models/banquet";
import { NextRequest, NextResponse } from "next/server";
import { handleNewFolderPatch } from "./handleNewFolder";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      console.log("🚀 ~ PATCHGallery MIddleware~ id:", id)
      const newGalleryObject = await GalleryMiddleware(req,"banquet")
      const banquet = await handleNewFolderPatch(id, newGalleryObject );
      return banquet;
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
  }