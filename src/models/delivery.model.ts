import mongoose, { Schema, Document } from 'mongoose';

export interface Delivery extends Document {
    SerialNo: string;
    ClientNo: number;
    ClientEmail: string;
    ClientName: string;
    CompanyName: string;
    CompanyTel: number;
    CompanyAddress: string;
    PoNumber: string
    DCDate: string;
    products: Array<{
        description: string
    }>;
    BillRef: mongoose.Schema.Types.ObjectId
}

const DeliverySchema: Schema<Delivery> = new Schema({
    SerialNo: { type: String, required: true },
    CompanyName: { type: String, required: true },
    CompanyTel: { type: Number, required: true },
    CompanyAddress: { type: String, required: true },
    ClientNo: { type: Number },
    ClientEmail: { type: String },
    ClientName: { type: String },
    PoNumber: { type: String, required: true },
    DCDate: { type: String, required: true },
    products: [
        {
            description: { type: String, required: true }
        }
    ],
    BillRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }
})

const DeliveryModel = (mongoose.models.Delivery as mongoose.Model<Delivery>) || mongoose.model<Delivery>("Delivery", DeliverySchema)
export default DeliveryModel;