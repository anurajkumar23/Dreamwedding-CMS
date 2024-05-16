import { connectToDB } from "@/utils/database";
import { Model, Document } from "mongoose";
import { NextResponse, NextRequest } from "next/server";

connectToDB();

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

export async function handleGet(Model: Model<any, {}, {}>, modelName: string) {
  try {
    const users = await Model.find();
    return NextResponse.json({
      message: "success",
      length: users.length,
      data: { [modelName]: users },
    });
  } catch (error: any) {
    console.error(`Error fetching ${modelName}:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function handlePost<T extends Document>(
  Model: Model<T>,
  updatedData:any,
  modelName: string,
) {
  try {
    // let parsedData;

    // const requestData = await req.json();
    // if (validate === "required") {
    //   parsedData = parseRequiredFields(requestData, requiredFields);
    // } else if (validate === "restricted") {
    //   parsedData = parseRestrictedFields(requestData, requiredFields);
    // }
    const createdData = await Model.create(updatedData);

    return NextResponse.json({
      message: "success",
      data: { [modelName]: createdData },
    });
  } catch (error: any) {
    console.error(`Error creating ${modelName}:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function handleDelete<T extends Document>(
  Model: Model<T>,
  id: string,
  modelName: string
) {
  try {
    const deletedItem = await Model.findByIdAndDelete(id);

    if (!deletedItem) {
      return new NextResponse(`${modelName} not found`, { status: 404 });
    }

    return NextResponse.json({
      message: "success",
      data: { [modelName]: deletedItem },
    });
  } catch (error: any) {
    console.error(`Error deleting ${modelName}:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function handlePatch<T extends Document>(
  Model: Model<T>,
  id: string,
  modelName: string,
  updatedData: any
) {
  try {

    const updatedItem = await Model.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return new NextResponse(`${modelName} not found`, { status: 404 });
    }

    return NextResponse.json({
      message: "success",
      data: { [modelName]: updatedItem },
    });
  } catch (error: any) {
    console.error(`Error updating ${modelName}:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function handleGetById(
  Model: Model<any, {}, {}>,
  id: string,
  modelName: string
) {
  try {
    const users = await Model.findById(id);
    return NextResponse.json({
      message: "success",
      data: { [modelName]: users },
    });
  } catch (error: any) {
    console.error(`Error fetching ${modelName}:`, error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}
