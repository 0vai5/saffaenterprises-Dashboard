import Connect from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import Delivery from '@/models/delivery.model';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = await reqBody;
        const delivery = await Delivery.findByIdAndDelete(id);
        if (!delivery) {
            return NextResponse.json({
                message: "delivery not found",
                status: 404
            });
        }
        return NextResponse.json({
            message: "delivery deleted successfully",
            status: 200

        })
    } catch (error) {
        return NextResponse.json({
            message: "Error deleting delivery",
            status: 500
        });
    }
}