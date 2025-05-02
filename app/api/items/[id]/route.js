
import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/items";
import { NextResponse } from "next/server";




export async function PUT(request, {params}) {
    const {id} = params;
    const { newName: Name, newCategory:Category, newQuantity:Quantity, newPrice:Price} = await request.json();
    await connectMongoDB();
    await Item.findByIdAndUpdate(id, { Name, Category, Quantity, Price });
    return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const item = await Item.findOne({ _id: id });
    return NextResponse.json({item}, { status: 200 });
}

// import connectMongoDB from "@/libs/mongodb";
// import Item from "@/models/items";
// import { NextResponse } from "next/server";

// export async function GET(request, context) {
//     await connectMongoDB();
//     const { params } = await context;
//     const { id } = params; // ✅ FIXED

//     const item = await Item.findById(id);
//     return NextResponse.json({ item }, { status: 200 });
// }

// export async function PUT(request, context) {
//     await connectMongoDB();
//     const { params } = await context;
//     const { id } = params; // ✅ FIXED
//     const { newName: Name, newCategory: Category, newQuantity: Quantity, newPrice: Price } = await request.json();

//     await Item.findByIdAndUpdate(id, { Name, Category, Quantity, Price });
//     return NextResponse.json({ message: "Item updated successfully" }, { status: 200 });
// }
