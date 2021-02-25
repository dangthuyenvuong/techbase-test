import mongoose, { Schema } from "mongoose"
import ITeam from '../interfaces/team'


const TeamSchema: Schema = new Schema({
    name: { type: String, required: true },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    people: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model<ITeam>('Team', TeamSchema)