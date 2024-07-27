import { filter } from "@/utils/filterMiddleware";
import upload from "@/utils/upload";

export default async function decoratorMiddleware(req: Request) {
  console.log(req.headers)
  const data = await req.formData();
 

  const file = data.get("billboard");

  

  const filename = await upload(file, "decorator");

  const Data = await filter(data, "restricted", [
    "rating",
    "like",
    "contactUs",
    "reviews",
  ]);

  // console.log(Data, "ishu");
  // console.log(filename, "filename");

  let updatedData;

  if (file) {
    updatedData = { ...Data, billboard: filename };
  } else {
    updatedData = Data;
  }
  // console.log(updatedData, "updatedData");
  return updatedData;
}
