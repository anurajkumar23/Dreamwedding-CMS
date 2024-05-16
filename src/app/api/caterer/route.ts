
import Caterer from "@/models/caterer";
import { connectToDB } from "@/utils/database";
import { handleGet } from "@/utils/request";


import { NextRequest, NextResponse } from "next/server";

connectToDB()

export async function GET(){
 
    const decorator = await handleGet(Caterer, "caterer");

    return decorator;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try{

        const requestData = await req.json();
        const createdData = await Caterer.create(requestData);
        return NextResponse.json({
            message: "success",
            data: { "caterer": createdData },
          });
    }catch (error: any) {
        console.error(`Error creating Caterer:`, error);
        return NextResponse.json(
          { message: "error", error: error.message },
          { status: 500 }
        );
      }
  }

