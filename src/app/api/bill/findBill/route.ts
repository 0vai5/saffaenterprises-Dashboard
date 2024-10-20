import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Bill from '@/models/bill.model';

// Ensure the database connection is established
Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        // Fetch the challan by id
        const bill = await Bill.findById(id);

        // Check if challan is found
        if (!bill) {
            return NextResponse.json({
                message: "Bill not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: 'Fetched Bill successfully',
            data: bill,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching Bill:', error);
        return NextResponse.json({
            message: 'Failed to fetch Bill',
            error: error || 'Unknown error',
            status: 500
        });
    }
}
