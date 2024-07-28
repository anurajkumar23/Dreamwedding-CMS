// pages/api/protected.js
import { isLoggedIn } from "@/app/middleware/auth/authenticate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
  const user: { isAuthorized: boolean; message: any; status: number } =
  await isLoggedIn(req);
  
  console.log(user,"😊😊😊😊😊😊😊");
  if (!user.isAuthorized) {
    return NextResponse.json(
      { message: user.message, isAuthorized: user.isAuthorized },
      { status: user.status }
    );
  }
  return NextResponse.json(
    { message: user.message, isAuthorized: user.isAuthorized },
    { status: user.status }
  );

 
}
