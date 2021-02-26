import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

export const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    userType: {
        type: String,
        enum: ['director', 'leader', 'staff'],
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', UserSchema)

