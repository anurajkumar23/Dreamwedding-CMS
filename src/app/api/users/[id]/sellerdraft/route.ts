import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";
import govtImages from "./govtImagesMiddleware";
import fs from 'fs';
import path from 'path';

// Connect to the database when the file is loaded
connectToDB();

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    console.log("Entered seller draft");

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const draft = searchParams.get('draft');

    // Extract the user ID from the route parameters
    const { id } = params;

    console.log(draft, id, "Query and ID");

    let updatedData;
    try {
        if (draft !== "governmentInfo") {
            updatedData = await req.json();
        } else {
            updatedData = await govtImages(req);
        }

        // Update the user's draft field directly
        let updatedUser;
        if (draft !== "governmentInfo") {
            updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: { [`draft.${draft}`]: updatedData } },
                { new: true, runValidators: true }
            );
        } else {
            updatedUser = await User.findById(id);
            if (updatedUser.draft.governmentInfo) {
                // Handle document deletion if needed
                const document = updatedUser.draft.governmentInfo?.document; // Adjust according to your data structure
                if (document) {
                    const documentPath = path.join(process.cwd(), 'public', 'images', 'seller', document);
                    if (fs.existsSync(documentPath)) {
                        fs.unlinkSync(documentPath);
                    }
                }
            }
            // After deleting the old document, update with the new data
            updatedUser.draft.governmentInfo = updatedData;
            updatedUser = await updatedUser.save();
        }

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user draft:", error);
        return NextResponse.json({ message: "Failed to update draft" }, { status: 500 });
    }
}
