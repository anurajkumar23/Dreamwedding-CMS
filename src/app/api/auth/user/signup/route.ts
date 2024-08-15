import { NextRequest, NextResponse } from 'next/server';
import signToken from '@/app/middleware/auth/token';
import User from '@/models/user';
import cookie from 'cookie';
import { connectToDB } from '@/utils/database';

// Connect to the database
connectToDB();

// Helper function to set the JWT cookie
export const setCookie = (token: string): string => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };

  return cookie.serialize('jwt', token, cookieOptions);
};

// Helper function to set the authorization header
export const setResponseHeaders = (token: string): { Authorization: string } => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

// POST request handler for user signup
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract data from the request body
    const { email, password, name, phone } = await req.json();

    // Check if all required fields are provided
    if (!email || !password || !name || !phone) {
      return NextResponse.json({ success: false, message: 'Please fill all the fields' }, { status: 403 });
    }

    // Create a new user
    const newUser = await User.create({ email, phone, password, name, googleLogIn: false });

    // Sign a JWT token for the user
    const token = signToken(newUser._id, newUser.role);

    // Set the JWT cookie and response headers
    const cookieHeader = setCookie(token);
    const responseHeaders = setResponseHeaders(token);

    // Prevent the password from being sent in the response
    newUser.password = undefined;

    // Return the response with the token and user data
    return new NextResponse(
      JSON.stringify({ success: true, token, data: { user: newUser } }),
      {
        status: 201,
        headers: {
          ...responseHeaders,
          'Set-Cookie': cookieHeader,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
