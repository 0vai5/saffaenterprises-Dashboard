import Connect from '@/DBConfig/DBConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); // Await the request.json() call
        const { id } = reqBody;
        
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: 'User Deleted Successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Error Deleting User',
                error, 
            },
            { status: 500 }
        );
    }
}
