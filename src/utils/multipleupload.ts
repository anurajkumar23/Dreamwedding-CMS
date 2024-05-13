import { join } from "path";
import { writeFileSync } from "fs";
import { NextResponse } from "next/server";

export default async function multipleupload(data: any, folder: string) {
  try {
    const files = data.getAll("photos");
    console.log("🚀 ~ multipleupload ~ files:", files)
    
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No files uploaded" });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let filename;
      let mimetype;

      // Check mimetype to determine whether it's an image or video
      if (file.type.includes("image")) {
        mimetype = "jpeg"; // Set the mimetype for images to jpeg
        filename = `${folder}-${Date.now()}.jpeg`;
      } else if (file.type.includes("video")) {
        mimetype = "mp4"; // Set the mimetype for videos to mp4
        filename = `${folder}-${Date.now()}.mp4`;
      } else {
        return NextResponse.json({ success: false, message: "Unsupported file type" });
      }

      const path = join("public", "images", folder,"media", filename);

      writeFileSync(path, buffer);
      uploadedFiles.push(filename);
    }
    //   console.log("🚀 ~ multipleupload ~ uploadedFiles:", uploadedFiles)

    

    return uploadedFiles;
  } catch (error) {
    console.error("Error occurred during file upload:", error);
    return NextResponse.json({ success: false, message: "File upload failed" });
  }
}
