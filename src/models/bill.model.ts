import mongoose, { Schema, Document } from "mongoose";

export interface Bill extends Document {
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
    unitPrice: number;
    total: number;
  }>;
  grandTotal: number;
  DeliveryRef?: mongoose.Schema.Types.ObjectId;
  CrratedAt: Date;
}

const BillSchema: Schema<Bill> = new Schema({
  SerialNo: { type: Number, required: true },
  CompanyName: { type: String, required: true },
  CompanyTel: { type: Number, required: true },
  CompanyAddress: { type: String, required: true },
  DCDate: { type: String, required: true },
  ClientNo: { type: Number },
  ClientEmail: { type: String },
  ClientName: { type: String },
  PoNumber: { type: String, required: true },
  products: [
    {
      description: { type: String, required: true },
      unit: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  grandTotal: { type: Number, required: true },
  DeliveryRef: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery" },
  CrratedAt: { type: Date, default: Date.now },
});

const BillModel =
  (mongoose.models.Bill as mongoose.Model<Bill>) ||
  mongoose.model<Bill>("Bill", BillSchema);
export default BillModel;
