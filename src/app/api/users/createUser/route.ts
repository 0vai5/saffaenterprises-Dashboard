import Connect from '@/DBConfig/DBConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, username } = reqBody;
        
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });

        await newUser.save();
        return NextResponse.json({ 
            message: 'User created successfully',
            status: 201,
            data: {
                email,
                username
            }
            });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating user', error }, { status: 500 });
    }
}
