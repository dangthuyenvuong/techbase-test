
import { Document, Types } from 'mongoose'
export interface IUser extends Document {
    lastName: string,
    firstName: string,
    department: Types.ObjectId,
    userType: string,
}