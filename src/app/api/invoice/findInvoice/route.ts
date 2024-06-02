import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Invoice from '@/models/invoice.model';

// Ensure the database connection is established
Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        // Fetch the invoice by id
        const invoice = await Invoice.findById(id);

        // Check if invoice is found
        if (!invoice) {
            return NextResponse.json({
                message: "Invoice not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: 'Fetched Invoice successfully',
            data: invoice,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        return NextResponse.json({
            message: 'Failed to fetch Invoice',
            error: error || 'Unknown error',
            status: 500
        });
    }
}
