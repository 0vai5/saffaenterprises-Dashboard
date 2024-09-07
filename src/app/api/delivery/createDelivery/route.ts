import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Delivery from '@/models/delivery.model';


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

       

        const newDelivery = new Delivery({
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
        await newDelivery.save();

        // Return the created invoice
        return NextResponse.json({ message: 'Delivery created successfully', delivery: newDelivery });
    } catch (error) {
        // Handle errors
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
