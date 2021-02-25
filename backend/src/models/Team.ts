import mongoose, { Model, model, Schema, Types } from "mongoose"
import ITeam from '../interfaces/team'


const TeamSchema: Schema = new Schema({
    name: { type: String, required: true },
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model<ITeam>('Team', TeamSchema)

// export interface TeamDocument {
//     name: string,
//     department: Types.ObjectId,
//     people: [
//         { type: Types.ObjectId, ref: 'User' }
//     ]
// }


// export interface TeamModel extends Model<TeamDocument> {
//     people: User
// }


// const TeamSchema = Schema<TeamDocument>({
//     name: String,
//     department: {
//         type: Types.ObjectId,
//         ref: 'Deparment'
//     },
//     people: [
//         {
//             type: Types.ObjectId,
//             ref: 'User'
//         }
//     ]
// })

// export default model('Team', TeamSchema)