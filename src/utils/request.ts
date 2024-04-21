import { connectToDB } from "@/utils/database";
import { Model, Document } from "mongoose";
import { NextResponse,NextRequest } from "next/server";

connectToDB()

export async function handleGet(Model: Model<any, {}, {}>, modelName: string) {
    try {
        const users = await Model.find();
        return NextResponse.json({
            message: "success",
            length: users.length,
            data: { [modelName]: users },
        });
    } catch (error: any) {
        console.error(`Error fetching ${modelName}:`, error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}

export async function handlePost<T extends Document>(
    Model: Model<T>,
    req: NextRequest,
    modelName: string,
    requiredFields: string[]
) {
    try {
        const requestData = await req.json();
        const missingFields = requiredFields.filter(field => !requestData[field]);

        if (missingFields.length > 0) {
            return new NextResponse(`${missingFields.join(', ')} is required`, { status: 400 });
        }

        const createdData = await Model.create(requestData);

        return NextResponse.json({ message: "success", data: { [modelName]: createdData } });
    } catch (error: any) {
        console.error(`Error creating ${modelName}:`, error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}

export async function handleDelete<T extends Document>(
    Model: Model<T>,
    id: string,
    modelName: string
) {
    try {
        const deletedItem = await Model.findByIdAndDelete(id);

        if (!deletedItem) {
            return new NextResponse(`${modelName} not found`, { status: 404 });
        }

        return NextResponse.json({ message: "success", data: { [modelName]: deletedItem } });
    } catch (error: any) {
        console.error(`Error deleting ${modelName}:`, error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}

export async function handlePatch<T extends Document>(
    Model: Model<T>,
    req: NextRequest,
    id: string,
    modelName: string,
    allowedFields: string[]
) {
    try {
        const requestData = await req.json();
        const missingFields = allowedFields.filter(field => !requestData[field]);

        if (missingFields.length > 0) {
            return new NextResponse(`${missingFields.join(', ')} is required`, { status: 400 });
        }

        const updatedFields: any = {};
        allowedFields.forEach(field => {
            if (requestData[field] !== undefined) {
                updatedFields[field] = requestData[field];
            }
        });

        const updatedItem = await Model.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedItem) {
            return new NextResponse(`${modelName} not found`, { status: 404 });
        }

        return NextResponse.json({ message: "success", data: { [modelName]: updatedItem } });
    } catch (error: any) {
        console.error(`Error updating ${modelName}:`, error);
        return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
    }
}