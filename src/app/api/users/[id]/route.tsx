import User from "@/models/user";
import { handleDelete, handlePatch } from "@/utils/request";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await handleDelete(User, id, "user");
  return user;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await handlePatch(User, id, req, "user", ["email", "username"]);
  return user;
}
