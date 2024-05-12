import User from "@/models/user";
import { handleDelete, handleGetById, handlePatch } from "@/utils/request";
import {  NextRequest } from "next/server";

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
  const user = await handlePatch(User, req, id, "user","restricted", ["role"]);
  return user;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await handleGetById(User, id, "user");
  return user;
}