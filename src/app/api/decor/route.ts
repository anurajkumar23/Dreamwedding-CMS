import DecoratorMiddleware from "@/app/middleware/decor/DecorMiddleware";
import Decorator from "@/models/decorator";
import { connectToDB } from "@/utils/database";
import { handleGet, handlePost } from "@/utils/request";


import { NextRequest, NextResponse } from "next/server";

connectToDB()

export async function GET(){
 
    const decorator = await handleGet(Decorator, "decorator");

    return decorator;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const updatedData = await DecoratorMiddleware(req)
    const decorator = await handlePost(Decorator, updatedData, "decorator");
    return decorator
  }
