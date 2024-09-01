import Banquet from "@/models/banquet";
import Caterer from "@/models/caterer";
import Decorator from "@/models/decorator";
import Photographer from "@/models/photographer";

import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";

connectToDB();

const modelsMap: Record<string, any> = {
  Banquet, 
  Caterer,
  Decorator,
  Photographer
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const name = req.nextUrl.searchParams.get("name");

    if (!name || !modelsMap[name]) {
      return NextResponse.json(
        { success: false, message: "Invalid model name" },
        { status: 400 }
      );
    }

    let { adminRating } = await req.json();
    
    const Model = modelsMap[name];

    let updateQuery;
    if ( adminRating === 1) {
   
      updateQuery = { $unset: { adminRating: "" } };
    } else {

      updateQuery = { adminRating: adminRating };
    }

    const updatedDocument = await Model.findByIdAndUpdate(
      id,
      updateQuery, 
      { new: true }
    );

    if (!updatedDocument) {
      return NextResponse.json(
        { success: false, message: `${name} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Update Success", data: updatedDocument },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
