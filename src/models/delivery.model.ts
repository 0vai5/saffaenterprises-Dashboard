import mongoose, { Schema, Document } from 'mongoose';

export interface Delivery extends Document {
    DCNo: string;
    ClientNo: number;
    ClientEmail: string;
    ClientName: string;
    CompanyName: string;
    CompanyTel: number;
    CompanyAddress: string;
    InvoiceDate: string;
    PoNumber: string
    DCDate: string;
    products: Array<{
        description: string
    }>;
}

const DeliverySchema: Schema<Delivery> = new Schema({
    DCNo: { type: String },
    CompanyName: { type: String, required: true },
    CompanyTel: { type: Number, required: true },
    CompanyAddress: { type: String, required: true },
    ClientNo: { type: Number },
    ClientEmail: { type: String },
    ClientName: { type: String },
    InvoiceDate: { type: String, required: true },
    PoNumber: { type: String, required: true },
    DCDate: { type: String, required: true },
    products: [
        {
            description: { type: String, required: true }
        }
    ]
})

const DeliveryModel = (mongoose.models.Delivery as mongoose.Model<Delivery>) || mongoose.model<Delivery>("Delivery", DeliverySchema)
export default DeliveryModel;