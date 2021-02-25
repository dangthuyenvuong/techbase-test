import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";

export const UserSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
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

