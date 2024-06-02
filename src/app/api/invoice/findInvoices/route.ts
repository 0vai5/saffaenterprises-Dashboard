import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Invoice from '@/models/invoice.model';

Connect();

export async function GET() {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 }).limit(3);
        if (!invoices) {
            return NextResponse.json({
                message: "No invoices found",
                status: 404
            })
        }
        return NextResponse.json({
            invoices,
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Error fetching invoices',
            error,
            status: 500
        });
    }
}
