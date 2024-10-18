import mongoose, {Document, Schema} from 'mongoose';

export interface Company extends Document {
    CompanyName: string;
    CompanyTel: number;
    CompanyAddress: string;
    ClientNo: number;
    ClientEmail: string;
    ClientName: string;
}

const companySchema: Schema<Company> = new Schema({
    CompanyName: { type: String, required: true },
    CompanyTel: { type: Number, required: true },
    CompanyAddress: { type: String, required: true },
    ClientNo: { type: Number },
    ClientEmail: { type: String },
    ClientName: { type: String }
})

const CompanyModel = (mongoose.models.Company as mongoose.Model<Company>) || mongoose.model<Company>("Company", companySchema)
export default CompanyModel;