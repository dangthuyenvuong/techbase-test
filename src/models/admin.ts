import mongoose, { Schema } from "mongoose";
import IAdmin from "../interfaces/admin";

export const AdminSchema: Schema = new Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: {
        type: String,
        enum: ['supper-admin', 'editor', 'guest'],
        default: 'guest'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

export default mongoose.model<IAdmin>('Admin', AdminSchema)

