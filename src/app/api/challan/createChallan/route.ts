import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Challan from '@/models/challan.model';


Connect();

export async function POST(request: NextRequest) {
    try {
        const {
            invoiceID,
            DCNo,
            ClientNo,
            ClientEmail,
            ClientName,
            CompanyName,
            CompanyTel,
            CompanyAddress,
            InvoiceDate,
            PoNumber,
            DCDate,
            products,
            grandTotal
        } = await request.json();

       

        const newChallan = new Challan({
            invoiceID,
            ClientNo,
            ClientEmail,
            ClientName,
            CompanyName,
            CompanyTel,
            CompanyAddress,
            InvoiceDate,
            PoNumber,
            DCNo,
            DCDate,
            products,
            grandTotal
        });

        // Save the invoice to the database
        await newChallan.save();

        // Return the created invoice
        return NextResponse.json({ message: 'Challan created successfully', invoice: newChallan });
    } catch (error) {
        // Handle errors
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
