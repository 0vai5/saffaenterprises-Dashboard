import Connect from '@/DBConfig/DBConfig';
import Invoice from '@/models/invoice.model';
import { NextRequest, NextResponse } from 'next/server';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { OrganizationName } = reqBody;

        const invoices = await Invoice.find({ OrganizationName });

        if (!invoices || invoices.length === 0) {
            return NextResponse.json({
                message: "No invoices found",
                status: 404
            });
        }

        return NextResponse.json({
            message: "Invoices fetched successfully",
            data: invoices,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json({
            message: 'Failed to search for invoices',
            status: 500
        });
    }
}
