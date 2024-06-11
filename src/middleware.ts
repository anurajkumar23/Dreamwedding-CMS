// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.next()
// }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



