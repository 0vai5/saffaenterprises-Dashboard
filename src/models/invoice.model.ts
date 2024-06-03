import mongoose, { Schema, Document } from 'mongoose';

export interface Invoice extends Document {
    ClientNo: number;
    ClientEmail: string;
    ClientName: string;
    OrganizationName: string;
    OrganizationTel: number;
    OrganizationAddress: string;
    InvoiceDate: string;
    PoNumber: number
    DCNo: number;
    DCDate: string;
    products: Array<{
        product: string,
        quantity: number,
        unitPrice: number,
        total: number
    }>;
    grandTotal: number
}

const InvoiceSchema: Schema<Invoice> = new Schema({
    ClientNo: { type: Number, required: true },
    ClientEmail: { type: String, required: true },
    ClientName: { type: String, required: true },
    OrganizationName: { type: String, required: true },
    OrganizationTel: { type: Number, required: true },
    OrganizationAddress: { type: String, required: true },
    InvoiceDate: { type: String, required: true },
    PoNumber: { type: Number, required: true },
    DCNo: { type: Number, required: true },
    DCDate: { type: String, required: true },
    products: [
        {
            product: { type: String, required: true },
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    grandTotal: { type: Number, required: true }
})

const InvoiceModel = (mongoose.models.Invoice as mongoose.Model<Invoice>) || mongoose.model<Invoice>("Invoice", InvoiceSchema)
export default InvoiceModel;