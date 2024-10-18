import Connect from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import Delivery from "@/models/delivery.model";

Connect();

export const POST = async (request: NextRequest) => {
    try {
        const { SerialNo } = await request.json();

        if (!SerialNo) {
            return NextResponse.json({
                status: 400, // Bad request
                message: "SerialNo is required",
            });
        }

        const delivery = await Delivery.findOne({ SerialNo });

        if (!delivery) {
            return NextResponse.json({
                status: 404,
                message: "Delivery not found",
            });
        }

        return NextResponse.json({
            status: 200,
            message: "Delivery found",
            data: delivery,
        });
    } catch (error) {
        console.error("Error fetching delivery:", error);

        return NextResponse.json({
            status: 500,
            message: "An error occurred while fetching delivery",
        });
    }
};
