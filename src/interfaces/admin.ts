
import { Document } from 'mongoose'
export default interface IAdmin extends Document {
    userType: string,
    username: string,
    password: string
}