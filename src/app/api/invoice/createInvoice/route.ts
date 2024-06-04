import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Invoice from '@/models/invoice.model';


Connect();

export async function POST(request: NextRequest) {
    try {
        const {
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
        } = await request.json();

       

        const newInvoice = new Invoice({
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
        await newInvoice.save();

        // Return the created invoice
        return NextResponse.json({ message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        // Handle errors
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
