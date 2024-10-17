import Connect from '@/DBConfig/DBConfig';
import { NextRequest, NextResponse } from 'next/server';
import Delivery from '@/models/delivery.model';


Connect();

export async function POST(request: NextRequest) {
    try {
        const {
            ClientNo,
            ClientEmail,
            ClientName,
            CompanyName,
            CompanyTel,
            CompanyAddress,
            PoNumber,
            DCDate,
            products,
        } = await request.json();

        const lastDelivery = await Delivery.findOne().sort({ SerialNo: -1 });
        const newSerialNumber = lastDelivery ? lastDelivery.SerialNo + 1 : 1;

        const newDelivery = new Delivery({
            SerialNo: newSerialNumber,
            ClientNo,
            ClientEmail,
            ClientName,
            CompanyName,
            CompanyTel,
            CompanyAddress,
            PoNumber,
            DCDate,
            products,
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
