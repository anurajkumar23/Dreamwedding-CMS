import { filter } from "@/utils/filterMiddleware";
import upload from "@/utils/upload";

export default async function photographerMiddleware(req: Request) {
  
  const data = await req.formData();
 console.log(data,"data")
 
  const file = data.get("billboard");

  const filename = await upload(file, "photographer");

  const Data = await filter(data, "restricted", [
    "rating",
    "like",
    "contactUs",
    "reviews",
  ]);

  // console.log(Data, "ishu");
  // console.log(filename, "filename");

  const locationData = JSON.parse(Data.location)
  console.log(locationData,"location")
  let updatedData;

  if (file) {
    updatedData = { ...Data, billboard: filename,location:locationData };
  } else {
    updatedData = {...Data,location:locationData};
  }


  return updatedData;
}
