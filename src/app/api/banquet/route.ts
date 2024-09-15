import banquetMiddleware from "@/app/middleware/Banquet/banquetMiddleware";
import Banquet from "@/models/banquet";
import { connectToDB } from "@/utils/database";

import { handleGet, handlePost } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

connectToDB()

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      console.log(searchParams,"paramas")

      const filters: any = {};

      for (const [key, value] of searchParams) {
        switch (key) {
          case 'rating':
            if (value === 'true') {
              filters.rating = { $gte: 4 };
            }
            break;
          case 'budgetFriendly':
            if (value === 'true') {
              filters.price = { $lte: 30000 }; 
            }
            break;
         
        }
      }
  

      console.log(filters,"fimters")

      const banquet = await Banquet.find(filters);
      
      // If banquet data is successfully fetched, return success response
      return NextResponse.json({
        message: "success",
        length: banquet.length,
        data: banquet,
      });
    } catch (error: any) {
      // Log and return error response if something goes wrong
      console.error("Error fetching banquet data:", error);
      return NextResponse.json(
        { message: "error", error: error.message },
        { status: 500 }
      );
    }
  }
export async function POST(req: NextRequest, res: NextResponse) {
    
    const updatedData = await banquetMiddleware(req)

    const banquet = await handlePost(Banquet, updatedData, "banquet");
    return banquet
  }

 
  