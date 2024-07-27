import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { handleGet, handlePost } from "@/utils/request";
import { NextResponse, NextRequest } from "next/server";

connectToDB();

export async function GET() {
  const users = await handleGet(User, "users");
  return users;
}

export async function POST(req: NextRequest, res: NextResponse) {
  
  const user = await handlePost(User,updatedData,"user");
  return user
}
