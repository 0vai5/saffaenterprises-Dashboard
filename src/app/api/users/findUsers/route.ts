import Connect from '@/DBConfig/DBConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

// Ensure database connection
Connect();

export async function GET() {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return NextResponse.json({
                message: 'No users found',
                status: 404
            });
        }

        return NextResponse.json({
            message: 'Users fetched successfully',
            data: users,
            status: 200
        });
    } catch (error) {
        // Handle errors
        return NextResponse.json({
            message: 'Error fetching users',
            error,
            status: 500
        });
    }
}
