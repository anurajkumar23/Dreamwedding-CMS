// pages/api/upload.js

import { join } from "path";
import { writeFileSync } from "fs";
import { NextResponse } from "next/server";


export default async function upload(file:any,folder: string) {
  try {

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${folder}-${Date.now()}.pdf`;

    const path = join("public", "images", folder, filename);

    writeFileSync(path, buffer);
    return filename;
  } catch (error) {
    console.error("Error occurred during file upload:", error);
    NextResponse.json({ success: false, message: "File upload failed" });
  }
 
}
