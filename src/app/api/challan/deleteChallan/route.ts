import Connect from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import Challan from '@/models/challan.model';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = await reqBody;
        const challan = await Challan.findByIdAndDelete(id);
        if (!challan) {
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