import mongoose, { Schema, Document } from 'mongoose';

export interface Invoice extends Document {
    invoiceID: string
    ClientNo: number;
    ClientEmail: string;
    ClientName: string;
    CompanyName: string;
    CompanyTel: number;
    CompanyAddress: string;
    InvoiceDate: string;
    PoNumber: string
    DCNo: number;
    DCDate: string;
    products: Array<{
        description: string,
        unit: number,
        unitPrice: number,
        total: number
    }>;
    grandTotal: number
}

const InvoiceSchema: Schema<Invoice> = new Schema({
    invoiceID: {
        type: String,
    },
    CompanyName: { type: String, required: true },
    CompanyTel: { type: Number, required: true },
    CompanyAddress: { type: String, required: true },
    ClientNo: { type: Number },
    ClientEmail: { type: String },
    ClientName: { type: String },
    InvoiceDate: { type: String, required: true },
    PoNumber: { type: String, required: true },
    DCNo: { type: Number, required: true },
    DCDate: { type: String, required: true },
    products: [
        {
            description: { type: String, required: true },
            unit: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    grandTotal: { type: Number, required: true }
})

const InvoiceModel = (mongoose.models.Invoice as mongoose.Model<Invoice>) || mongoose.model<Invoice>("Invoice", InvoiceSchema)
export default InvoiceModel;