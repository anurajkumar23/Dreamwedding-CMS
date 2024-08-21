import Seller from "@/models/seller";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";

// Connect to the database when the file is loaded
connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("Entered seller draft");
  const { id } = params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Destructure personal information from the user document
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      address,
      pincode,
      city,
      state,
      whatsappNumber,
    } = user.draft?.personalInfo || {};

    // Destructure important information and set bank fields under bank object
    const {
      GSTNO,
      bank = {
        name: undefined,
        account: undefined,
        reenterAccount: undefined,
        ifsc: undefined,
        holdername: undefined,
      },
    } = user.draft?.importantInfo || {};

    const {
      pancard,
      document
    } = user.draft?.governmentInfo || {};

    // Log the data with bank fields nested under bank object
    const data={
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      address,
      pincode,
      city,
      state,
      whatsappNumber,
      GSTNO,
      bank: {
        name: bank.name,
        account: bank.account,
        reenterAccount: bank.reenterAccount,
        ifsc: bank.ifsc,
        holdername: bank.holdername
      },
      pancard,
      document,
      userid:id
    };

    const seller = await Seller.create(data)
    console.log(seller,"seller")
    user.sellerRequest="pending"
    await user.save()
    return NextResponse.json({message:"success",data:seller}, { status: 200 });
  } catch (error) {
    console.error("Error sending request", error);
    return NextResponse.json(
      { message: "Failed. Try after some time" },
      { status: 500 }
    );
  }
}
