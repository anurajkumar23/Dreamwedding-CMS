import { filter } from "@/utils/filterMiddleware";
import upload from "@/utils/upload";

export default async function banquetMiddleware(req: Request) {
  console.log(req)
  const data = await req.formData();
  console.log(data,"data")
  const file = data.get("billboard");

  const filename = await upload(file, "banquet");

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
