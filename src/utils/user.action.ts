"use client";

import User from "@/models/user";
import { connectToDB } from "./database";
export async function createUser(user: any) {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
