
import { Document } from 'mongoose'
export interface IUser extends Document {
    last_name: string,
    first_name: string,
    user_type: {
        type: string,
        enum: ['director', 'leader', 'staff']
    }
}