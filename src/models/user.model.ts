import mongoose, { Schema, Document } from 'mongoose'

export interface User extends Document {
    email: string;
    password: string;
    username: string;
    createdAt: Date
};

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please Enter a Valid Email Address']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    username: {
        type: String,
        required: [true, 'Username is Required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel;