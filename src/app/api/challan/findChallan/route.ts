import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Challan from '@/models/challan.model';

// Ensure the database connection is established
Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;

        // Fetch the challan by id
        const challan = await Challan.findById(id);

        // Check if challan is found
        if (!challan) {
            return NextResponse.json({
                message: "challan not found",
                status: 404
            });
        }

        return NextResponse.json({
            message: 'Fetched challan successfully',
            data: challan,
            status: 200
        });
    } catch (error) {
        console.error('Error fetching Challan:', error);
        return NextResponse.json({
            message: 'Failed to fetch Challan',
            error: error || 'Unknown error',
            status: 500
        });
    }
}
