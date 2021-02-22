import mongoose from "../config/database";

const User = mongoose.model('User', {
    name: String,
})

export default User;