import Connect from '@/DBConfig/DBConfig';
import Invoice from '@/models/invoice.model';
import { NextRequest, NextResponse } from 'next/server';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { searchQuery } = reqBody;

        // Create a regex for case-insensitive search and partial matches
        const regex = new RegExp(searchQuery, 'i');
        const numericQuery = isNaN(Number(searchQuery)) ? null : Number(searchQuery);

        console.log('Search query:', searchQuery); // Debug: Log search query
        console.log('Regex:', regex); // Debug: Log regex
        console.log('Numeric query:', numericQuery); // Debug: Log numeric query

        const invoices = await Invoice.find({
            $or: [
                { invoiceId: { $regex: regex } },
                { OrganizationName: { $regex: regex } },
                { ClientName: { $regex: regex } },
                { ClientEmail: { $regex: regex } },
                ...(numericQuery !== null ? [
                    { PoNumber: numericQuery },
                    { ClientNo: numericQuery }
                ] : [])
            ]
        });

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
        console.error('Error fetching invoices:', error); // Debug: Log error message
        return NextResponse.json({
            message: 'Failed to search for invoices',
            error, // Include error message in response
            status: 500
        });
    }
}
