import photographerMiddleware from "@/app/middleware/Photographer/PhotographerMiddleware";
import Photographer from "@/models/photographer";
import { connectToDB } from "@/utils/database";
import { handlePost } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams, "params");

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
            filters.price = { $lte: 20000 }; // Budget-friendly filter for photographers
          }
          break;
        case "city":
          if (value) {
            filters["location.city"] = value.toLowerCase(); // Case-insensitive city filter
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

    console.log(filters, "filters");
    console.log(sort, "sort");

    // Fetch photographer data based on filters and sorting
    const photographers = await Photographer.find(filters).sort(sort);

    // Return success response
    return NextResponse.json({
      message: "success",
      length: photographers.length,
      data: photographers,
    });
  } catch (error: any) {
    // Log and return error response if something goes wrong
    console.error("Error fetching photographer data:", error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const updatedData = await photographerMiddleware(req);

  const photographer = await handlePost(Photographer, updatedData, "photographer");
  return photographer;
}
