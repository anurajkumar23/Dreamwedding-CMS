// import Banquet from "@/models/banquet";
// import { NextRequest, NextResponse } from "next/server";


// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//       const { id } = params;
//       const updatedData = await banquetMiddleware(req)
//       const banquet = await handlePatch(Banquet, id, "banquet" ,updatedData );
//       return banquet;
//     } catch (error) {
//       console.error("Error occurred:", error);
//       return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
//     }
//   }