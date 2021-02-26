import mongoose, { Schema } from 'mongoose'
import IDeparment from '../interfaces/department';


const DeparmentSchema: Schema = new Schema({
    name: String,
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})


export default mongoose.model<IDeparment>('Department', DeparmentSchema)
