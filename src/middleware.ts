
import { NextResponse } from "next/server";
import authMiddleware from "./middleware/api/authMiddleware";

export const config = {
  matcher: ["/api/:path*"],
};

export default async function middleware(request: Request) {
  const response = await authMiddleware(request);

  // if (!authResult?.isValid && request.url.includes("api/users")) {
  //   return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
  //     status: 401,
  //   });
  // }
  if (response) {
    return response;
  }
  return NextResponse.next();
}
