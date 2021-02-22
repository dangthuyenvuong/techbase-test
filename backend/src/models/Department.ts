import mongoose from "../config/database";

const User = mongoose.model('Deparment', {
    name: String,
})

export default User;