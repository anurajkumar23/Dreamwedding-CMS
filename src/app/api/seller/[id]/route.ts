import Seller from "@/models/seller";
import { handleDelete, handleGetById, handlePatch } from "@/utils/request";
import {  NextRequest } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    const seller = await handleGetById(Seller, id, "seller");
    return seller;
  }

