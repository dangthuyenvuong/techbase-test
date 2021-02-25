import mongoose, { Schema, Types } from 'mongoose'
import IDeparment from '../interfaces/deparment';


const DeparmentSchema: Schema = new Schema({
    name: String,
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    people: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
})


export default mongoose.model<IDeparment>('Deparment', DeparmentSchema)
