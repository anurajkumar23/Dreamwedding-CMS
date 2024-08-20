import { filter } from "@/utils/filterMiddleware";

import uploadPDF from "@/utils/uploadPDF";


function removeString(data: any) {
  const result: any = { ...data };
}


export default async function govtImages(req: Request) {

  const data = await req.formData();
  // console.log(data,"data")
  console.log(data,"‼‼‼‼‼")
  const file = data.get("document");
  console.log(file)

  const filename = await uploadPDF(file, "seller");

  console.log(filename,"filename")

  const Data = await filter(data, "restricted", [
    "rating",
    "like",
    "contactUs",
    "reviews",
  ]);

 console.log(Data, "ishu");
 console.log(filename, "filename");

  
  const updatedData = {...Data , document:filename}
  console.log(updatedData,"updatedData")
  return updatedData;
}
