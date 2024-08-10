import { filter } from "@/utils/filterMiddleware";
import upload from "@/utils/upload";


function removeString(data: any) {
  const result: any = { ...data };
}


export default async function banquetMiddleware(req: Request) {

  const data = await req.formData();
  // console.log(data,"data")
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

  console.log(Data,"Data ❤❤❤❤❤")
  const location = JSON.parse(Data.location)
  const services = JSON.parse(Data.services)
  const specialFeature = JSON.parse(Data.specialFeature)
  const availability = JSON.parse(Data.availability)
  
  
  let updatedData;

  if (file) {
    updatedData = { ...Data, billboard: filename ,location,services,specialFeature,availability};
    console.log(updatedData," updatedData ❤❤❤❤❤")
  } else {
    updatedData = Data;
  }
  // console.log(updatedData, "updatedData");
  return updatedData;
}
