import Item from "@/models/items";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { Name, Category, Quantity, Price } = await request.json();
    await connectMongoDB();
    await Item.create({ Name, Category, Quantity, Price });
    return NextResponse.json({ message: "Item created successfully" }, { status: 201 });  
}

export async function GET(){
    await connectMongoDB();
    const items = await Item.find({});
    return NextResponse.json(items, { status: 200 });
}

export async function DELETE(request) {
    const  id  = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
}