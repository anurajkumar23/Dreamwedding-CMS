import { filter } from "@/utils/filterMiddleware";
import upload from "@/utils/upload";

export async function JsonFilter(data, actionType, fieldsToRemove) {
  if (actionType === "restricted") {
    fieldsToRemove.forEach((field) => {
      if (field in data) {
        delete data[field]; // Remove the field from data
      }
    });
  }
  return data;
}

export default async function decoratorMiddleware(req: Request) {
  console.log(req.headers);

  // Parsing the request body to JSON format
  let data = await req.json();

  // Removing specified fields if they exist
  const filteredData = await JsonFilter(data, "restricted", [
    "rating",
    "like",
    "contactUs",
    "reviews",
  ]);

  return filteredData;
}
