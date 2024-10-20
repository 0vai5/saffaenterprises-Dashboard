import Connect from "@/DBConfig/DBConfig";
import { NextRequest, NextResponse } from "next/server";
import Bill from "@/models/bill.model";
import DeliveryModel from "@/models/delivery.model";

Connect();

export async function POST(request: NextRequest) {
  try {
    const {
      DeliveryRef,
      SerialNo,
      DCDate,
      ClientNo,
      ClientEmail,
      ClientName,
      CompanyName,
      CompanyTel,
      CompanyAddress,
      PoNumber,
      products,
      grandTotal,
    } = await request.json();

    const newBill = new Bill({
      SerialNo,
      DeliveryRef,
      ClientNo,
      ClientEmail,
      ClientName,
      CompanyName,
      CompanyTel,
      CompanyAddress,
      DCDate,
      PoNumber,
      products,
      grandTotal,
    });

    // Save the invoice to the database
    await newBill.save();

    const Delivery = await DeliveryModel.findByIdAndUpdate(DeliveryRef, {
      $set: {
        BillRef: newBill._id,
        status: true,
        products: products,
        grandTotal: grandTotal,
      },
    });

    // Return the created invoice
    return NextResponse.json({
      message: "Challan created successfully",
      bill: newBill,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return NextResponse.json({
      message: "An error occurred",
      status: 500,
    });
  }
}
