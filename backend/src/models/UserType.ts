import mongoose from "../config/database";

const UserType = mongoose.model('UserType', {
    name: String,
    level: Number
})

export default UserType;