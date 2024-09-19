import DecoratorMiddleware from "@/app/middleware/decor/DecorMiddleware";
import Decorator from "@/models/decorator";
import { connectToDB } from "@/utils/database";
import { handlePost } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

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
            filters.price = { $lte: 20000 }; // Example price filter for budget-friendly decorators
          }
          break;
        case "city":
          if (value) {
            filters["location.city"] = value.toLowerCase(); // Case-insensitive city filtering
          }
          break;
        case "pincode":
          if (value) {
            filters["location.pincode"] = value; // Apply pincode filter
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

    // Fetch decorator data based on filters and sorting
    const decorators = await Decorator.find(filters).sort(sort);

    return NextResponse.json({
      message: "success",
      length: decorators.length,
      data: decorators,
    });
  } catch (error: any) {
    console.error("Error fetching decorator data:", error);
    return NextResponse.json(
      { message: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const updatedData = await DecoratorMiddleware(req);
    const decorator = await handlePost(Decorator, updatedData, "decorator");
    return decorator;
  } catch (error: any) {
    return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
  }
}
