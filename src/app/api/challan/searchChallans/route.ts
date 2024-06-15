import Connect from '@/DBConfig/DBConfig';
import Challan from '@/models/challan.model';
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

        const challans = await Challan.find({
            $or: [
                { invoiceId: { $regex: regex } },
                { CompanyName: { $regex: regex } },
                { ClientName: { $regex: regex } },
                { ClientEmail: { $regex: regex } },
                { PoNumber: {$regex: regex} },
                ...(numericQuery !== null ? [
                    { ClientNo: numericQuery }
                ] : [])
            ]
        });

        if (!challans || challans.length === 0) {
            return NextResponse.json({
                message: "No challans found",
                status: 404
            });
        }

        return NextResponse.json({
            message: "challans fetched successfully",
            data: challans,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching challans:', error); // Debug: Log error message
        return NextResponse.json({
            message: 'Failed to search for challans',
            error, // Include error message in response
            status: 500
        });
    }
}
