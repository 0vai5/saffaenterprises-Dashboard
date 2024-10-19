import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Company from '@/models/company.model';

Connect();

export async function POST(request: NextRequest) {
    try {
        const {
            CompanyName,
            CompanyAddress,
            CompanyTel,
            ClientEmail,
            ClientNo,
            ClientName
        } = await request.json();

        // Simple validation to check required fields
        if (!CompanyName || !CompanyAddress || !CompanyTel || !ClientEmail || !ClientNo || !ClientName) {
            return NextResponse.json({
                message: 'All fields are required',
                status: 400
            });
        }

        const company = new Company({
            CompanyName,
            CompanyAddress,
            CompanyTel,
            ClientEmail,
            ClientNo,
            ClientName
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
