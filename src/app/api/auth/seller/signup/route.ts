import { NextRequest, NextResponse } from 'next/server';
import signToken from '@/app/middleware/auth/token';

import Seller from '@/models/seller';
import { setCookie,setResponseHeaders } from '../../user/signup/route';
import cookie from 'cookie';
import { connectToDB } from '@/utils/database';



connectToDB();
// export function setCookie(token: string) {
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//   };

//   return cookie.serialize('jwt', token, cookieOptions);
// }

// export function setResponseHeaders(token: string) {
//   return {
//     'Authorization': `Bearer ${token}`
//   };
// }

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ success: false, message: "Please fill all the fields" }, { status: 403 });
    }

    const newSeller = await Seller.create({ email, phone, password, name });

    const token = signToken(newSeller._id);

    const cookieHeader = setCookie(token);
    const responseHeaders = setResponseHeaders(token);

    newSeller.password = undefined;

    return new NextResponse(
      JSON.stringify({ success: true, token, data: { seller: newSeller } }),
      {
        status: 201,
        headers: {
          ...responseHeaders,
          'Set-Cookie': cookieHeader,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
