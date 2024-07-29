// pages/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import signToken from '@/app/middleware/auth/token';
import User from '@/models/user';
import { setCookie, setResponseHeaders } from '../signup/route';
import { connectToDB } from '@/utils/database';


connectToDB();
export async function POST(req: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide email and password' }, { status: 400 });
    }

    // Find the user by email and include the password field
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return NextResponse.json({ success: false, message: 'Incorrect email or password' }, { status: 401 });
    }

    const token = signToken(user._id);

    const cookieHeader = setCookie(token);
    const responseHeaders = setResponseHeaders(token);

    user.password = undefined;

    return new NextResponse(
      JSON.stringify({ success: true, token, user }),
      {
        status: 200,
        headers: {
          ...responseHeaders,
          'Set-Cookie': cookieHeader,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
