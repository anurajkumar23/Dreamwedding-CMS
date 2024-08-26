import Seller from "@/models/seller";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

connectToDB();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const newStatus = searchParams.get('status');

  if (!newStatus) {
    return NextResponse.json({ message: "Status not provided" }, { status: 400 });
  }

  try {
    const seller = await Seller.findById(id);
    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    seller.status = newStatus;
    await seller.save();

    const user = await User.findById(seller.userid);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (newStatus === "Accepted") {
      user.role = "seller";
      user.sellerRequest = "accepted";
    } else if (newStatus === "Rejected") {
      user.sellerRequest = "none";
    }

    await user.save();

    return NextResponse.json(seller, { status: 200 });

  } catch (error) {
    console.error("Error updating seller or user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
