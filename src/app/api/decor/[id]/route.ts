import DecoratorMiddleware from "@/app/middleware/decor/DecorMiddleware";
import Decorator from "@/models/decorator";

import { handleDelete, handleGetById, handlePatch } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updatedData = await DecoratorMiddleware(req);
    const decorator = await handlePatch(
      Decorator,
      id,
      "decorator",
      updatedData
    );
    return decorator;
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await handleDelete(Decorator, id, "decorator");
  return user;
}


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await handleGetById(Decorator, id, "decorator");
  return user;
}