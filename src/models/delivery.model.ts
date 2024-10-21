import mongoose, { Schema, Document } from "mongoose";

export interface Delivery extends Document {
  SerialNo: number;
  ClientNo: number;
  ClientEmail: string;
  ClientName: string;
  CompanyName: string;
  CompanyTel: number;
  CompanyAddress: string;
  PoNumber: string;
  DCDate: string;
  products: Array<{
    description: string;
    unit: number;
    price: number;
    total: number;
  }>;
  BillRef: mongoose.Schema.Types.ObjectId;
  status: boolean;
  grandTotal: number;
  CreatedAt: Date;
}

const DeliverySchema: Schema<Delivery> = new Schema({
  SerialNo: { type: Number, required: true },
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
      description: { type: String, required: true },
      unit: { type: Number },
      price: { type: Number },
      total: { type: Number },
    },
  ],
  BillRef: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
  status: { type: Boolean, default: false },
  grandTotal: { type: Number },
  CreatedAt: { type: Date, default: Date.now },
});

const DeliveryModel =
  (mongoose.models.Delivery as mongoose.Model<Delivery>) ||
  mongoose.model<Delivery>("Delivery", DeliverySchema);
export default DeliveryModel;
