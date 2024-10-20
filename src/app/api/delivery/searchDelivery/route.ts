import Connect from '@/DBConfig/DBConfig';
import Delivery from '@/models/delivery.model';
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

        const deliverys = await Delivery.find({
            $or: [
                ...(numericQuery !== null ? [
                    { SerialNo: numericQuery }
                ] : []),
                { CompanyName: { $regex: regex } },
                { ClientName: { $regex: regex } },
                { ClientEmail: { $regex: regex } },
                { PoNumber: { $regex: regex } },
                ...(numericQuery !== null ? [
                    { ClientNo: numericQuery }
                ] : [])
            ]
        });

        if (!deliverys || deliverys.length === 0) {
            return NextResponse.json({
                message: "No challans found",
                status: 404
            });
        }

        return NextResponse.json({
            message: "Delivery fetched successfully",
            data: deliverys,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching delivery:', error); // Debug: Log error message
        return NextResponse.json({
            message: 'Failed to search for delivery',
            error, // Include error message in response
            status: 500
        });
    }
}
