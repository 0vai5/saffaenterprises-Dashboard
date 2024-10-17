import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Company from '@/models/company.model';

Connect();

export async function POST(request: NextRequest) {
    try {
        const {
            companyName,
            companyAddress,
            companyTel,
            clientEmail,
            clientNo,
            clientName
        } = await request.json();

        // Simple validation to check required fields
        if (!companyName || !companyAddress || !companyTel || !clientEmail || !clientNo || !clientName) {
            return NextResponse.json({
                message: 'All fields are required',
                status: 400
            });
        }

        const company = new Company({
            companyName,
            companyAddress,
            companyTel,
            clientEmail,
            clientNo,
            clientName
        });

        await company.save();

        return NextResponse.json({
            message: 'Company Created Successfully',
            status: 200,
            company
        });

    } catch (error) {
        console.error("Error creating company:", error);
        return NextResponse.json({
            message: 'Error Creating Company',
            status: 500
        });
    }
}
