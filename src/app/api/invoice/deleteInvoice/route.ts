import Connect from "@/DBConfig/DBConfig";
import { NextResponse, NextRequest } from "next/server";
import Invoice from '@/models/invoice.model';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = await reqBody;
        const invoice = await Invoice.findByIdAndDelete(id);
        if (!invoice) {
            return NextResponse.json({
                message: "Invoice not found",
                status: 404
            });
        }
        return NextResponse.json({
            message: "Invoice deleted successfully",
            status: 200

        })
    } catch (error) {
        return NextResponse.json({
            message: "Error deleting invoice",
            status: 500
        });
    }
}