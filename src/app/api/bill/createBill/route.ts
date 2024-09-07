import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Bill from '@/models/bill.model';


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

       

        const newBill = new Bill({
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
        await newBill.save();

        // Return the created invoice
        return NextResponse.json({ message: 'Challan created successfully', bill: newBill });
    } catch (error) {
        // Handle errors
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
