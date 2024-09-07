import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Delivery from '@/models/delivery.model';

// Ensure the database connection is established
Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        // Fetch the challan by id
        const delivery = await Delivery.findById(id);

        // Check if challan is found
        if (!delivery) {
            return NextResponse.json({
                message: "delivery not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: 'Fetched delivery successfully',
            data: delivery,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching delivery:', error);
        return NextResponse.json({
            message: 'Failed to fetch delivery',
            error: error || 'Unknown error',
            status: 500
        });
    }
}
