import { NextRequest, NextResponse } from "next/server";
import { promisify } from "util";
import jwt from 'jsonwebtoken';
import User from "@/models/user"; // Ensure your User model exports the IUser interface
import { connectToDB } from "@/utils/database";

export async function isLoggedIn(req: NextRequest) {
  try {
    await connectToDB(); // Ensure DB connection

    const authorizationHeader = req.headers.get('authorization');

    let token = null;
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }

    if (!token) {
      return { status: 401, message: 'Token invalid or not found', isAuthorized: false };
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) as unknown as { id: string, iat: number, exp: number };

    // Check if user exists
    console.log(decoded.id, "❤❤❤❤❤");
   
    const currentUser = await User.findById(decoded.id);
    // console.log(currentUser, "🤩🤩🤩🤩🤩🤩");

    if (!currentUser) {
      return { status: 401, message: 'User not found', isAuthorized: false };
    }

    // Check if password was changed
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return { status: 401, message: 'Password changed', isAuthorized: false };
    }

    // User is authenticated, continue with the request
    return { status: 200, message: currentUser, isAuthorized: true };

  } catch (error) {
    console.error('Error in isLoggedIn function:', error);
    return { status: 500, message: "Internal server error", isAuthorized: false };
  }
}
