import banquetMiddleware from "@/app/middleware/Banquet/banquetMiddleware";
import Banquet from "@/models/banquet";
import { connectToDB } from "@/utils/database";
import { handlePost } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    // console.log(searchParams, "params");

    const filters: any = {};
    let sort: any = {}; // To hold sorting criteria

    // Filter Logic
    for (const [key, value] of searchParams) {
      switch (key) {
        case "rating":
          if (value === "true") {
            filters.rating = { $gte: 4 }; // Filter for ratings 4 and above
          }
          break;
        case "budgetFriendly":
          if (value === "true") {
            filters.price = { $lte: 30000 }; // Budget-friendly filter
          }
          break;
        case "city":
          if (value) {
            filters["location.city"] = value.toLowerCase(); // Convert city to lowercase for case-insensitive filtering
          }
          break;
        case "pincode":
          if (value) {
            filters["location.pincode"] = value; // Apply pincode filter if provided
          }
          break;
        case "sortBy":
          if (value === "priceLowToHigh") {
            sort.price = 1; // Sort price low to high
          } else if (value === "priceHighToLow") {
            sort.price = -1; // Sort price high to low
          }
          break;
        default:
          break;
      }
    }
    // Fetch banquet data based on filters and sorting
    const banquet = await Banquet.find(filters).sort(sort);

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
  const updatedData = await banquetMiddleware(req);

  const banquet = await handlePost(Banquet, updatedData, "banquet");
  return banquet;
}
