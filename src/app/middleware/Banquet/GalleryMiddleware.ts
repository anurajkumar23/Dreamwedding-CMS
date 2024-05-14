import { filter } from "@/utils/filterMiddleware";
import multipleupload from "@/utils/multipleupload";
import upload from "@/utils/upload";

export default async function GalleryMiddleware(req: Request) {
  const data = await req.formData();
  console.log("🚀 ~ GalleryMiddleware ~ data:", data)



  const filename = await multipleupload(data, "photographer");
  console.log("🚀 ~ GalleryMiddleware ~ filename:", filename)



  const Data = await filter(data, "required", [
    "name"
  ]);

//   console.log(Data, "ishu");
//   console.log(filename, "filename");

  let updatedData;

  if (filename) {
    updatedData = { ...Data, photos: filename };
  } else {
    updatedData = Data;
  }
  console.log(updatedData, "updatedData");
  return updatedData;
}

