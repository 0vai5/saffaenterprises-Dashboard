import Connect from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import Bill from '@/models/bill.model';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = await reqBody;
        const bill = await Bill.findByIdAndDelete(id);
        if (!bill) {
            return NextResponse.json({
                message: "Challan not found",
                status: 404
            });
        }
        return NextResponse.json({
            message: "Challan deleted successfully",
            status: 200

        })
    } catch (error) {
        return NextResponse.json({
            message: "Error deleting Challan",
            status: 500
        });
    }
}