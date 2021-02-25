import { Document, Types } from 'mongoose'

export default interface IDeparment extends Document {
    name: string,
    manager: Types.ObjectId,
    people: Types.Array<Types.ObjectId>
}