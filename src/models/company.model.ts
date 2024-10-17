import mongoose, {Document, Schema} from 'mongoose';

export interface Company extends Document {
    companyName: string;
    companyTel: number;
    companyAddress: string;
    clientNo: number;
    clientEmail: string;
    clientName: string;
}

const companySchema: Schema<Company> = new Schema({
    companyName: { type: String, required: true },
    companyTel: { type: Number, required: true },
    companyAddress: { type: String, required: true },
    clientNo: { type: Number },
    clientEmail: { type: String },
    clientName: { type: String }
})

const CompanyModel = (mongoose.models.Company as mongoose.Model<Company>) || mongoose.model<Company>("Company", companySchema)
export default CompanyModel;