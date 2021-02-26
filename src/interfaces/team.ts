import { Document, Types } from 'mongoose'

export default interface ITeam extends Document {
    name: string,
    manager: Types.ObjectId,
    department: Types.ObjectId,
    people: Types.Array<Types.ObjectId>
}