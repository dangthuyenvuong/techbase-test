import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user";
import Team from "./team";
// import mongoose from "../config/database";

const UserSchema: Schema = new Schema({
    name: { type: String, required: true }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', UserSchema)


// interface UserBaseDocument extends User, Document {
//     fullName: string
// }

// export interface UserDocument {
//     team: Team
// }

// export interface UserModel extends Model<UserDocument> {
//     team: Team
//   }



//   const UserSchema = Schema<UserDocument, UserModel>({
//     last_name: String,
//     first_name: String,
//     user_type: {
//         type: String,
//         enum: ['director', 'leader', 'staff']
//     }
// })
// export default model('User', UserSchema);