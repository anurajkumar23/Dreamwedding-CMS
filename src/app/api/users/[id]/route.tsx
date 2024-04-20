import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "success", data: { user } });
  } catch (error: any) {
    console.error("Error:", error);

    // If an error occurs, respond with an error message
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { email, username } = await req.json();
  try{
    const user = await User.findByIdAndUpdate(id, {
        email,
        username,
      },{
        new: true,
        runValidators: true,
      });
      return NextResponse.json({ message: "success", data: { user } });

  }catch(error){
    console.error("Error:", error);
  }


}
