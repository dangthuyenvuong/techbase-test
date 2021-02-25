
import { Document, Types } from 'mongoose'
export interface IUser extends Document {
    lastName: string,
    firstName: string,
    team: Types.ObjectId,
    userType: string,
    username: string,
    password: string
}