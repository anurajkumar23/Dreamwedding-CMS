// pages/api/upload.js

import { join } from "path";
import { writeFileSync } from "fs";
import { NextResponse } from "next/server";

export default async function upload(
  req: {
     formData: () => any 
},
  folder:string
) {
  try {
    const data = await req.formData();
    console.log("🚀 ~ data:", data);

    const file = data.get("billboard");
  

    if (!file) {
      return NextResponse
        .json({ success: false, message: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename =   `${folder}-${Date.now()}.jpeg`

    const path = join(
      "public",
      "images",
      "banquet",
      filename
    );
    

    writeFileSync(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    

    return filename

  } catch (error) {
    console.error("Error occurred during file upload:", error);
    NextResponse.json({ success: false, message: "File upload failed" });
  }
}
