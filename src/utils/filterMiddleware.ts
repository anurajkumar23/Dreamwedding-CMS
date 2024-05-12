import { NextRequest } from "next/server";
import { FormEvent } from "react";

function parseRequiredFields(requestData: any, requestedFields: string[]) {
  const parsedData: any = {};
  requestedFields.forEach((field) => {
    if (requestData[field] !== undefined) {
      parsedData[field] = requestData[field];
    }
  });
  return parsedData;
}

function parseRestrictedFields(requestData: any, requestedFields: string[]) {
  const parsedData = { ...requestData };
  requestedFields.forEach((field) => {
    if (parsedData[field] !== undefined) {
      delete parsedData[field];
    }
  });
  return parsedData;
}

export async function filter(
  formData: FormData,
  validate: "required" | "restricted",
  requiredFields: string[]
) {
  const requestData: any = {};
  
  // Iterate over FormData entries to populate requestData object
  for (const [name, value] of formData.entries()) {
    requestData[name] = value;
  }

  // Apply validation rules based on the provided fields
  if (validate === "required") {
    return parseRequiredFields(requestData, requiredFields);
  } else if (validate === "restricted") {
    return parseRestrictedFields(requestData, requiredFields);
  }
}
