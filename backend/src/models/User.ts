import mongoose from "../config/database";

const User = mongoose.model('User', {
    name: String,
    type: {
        type: String,
        enum: ['director', 'leader', 'staff']
    }
})

export default User;