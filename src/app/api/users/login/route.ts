import Connect from '@/DBConfig/DBConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

Connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const checkedPassword = await bcrypt.compare(password, user.password);
    if (!checkedPassword) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

    const response = NextResponse.json({
      message: 'Successfully logged in as: ' + user.username,
      success: true,
      user
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 3600, 
      path: '/', 
    });

    return response;
  } catch (error) {
    console.error('Error in logging in:', error);
    return NextResponse.json({
      message: 'Error in logging in',
      error
    }, { status: 500 });
  }
}
