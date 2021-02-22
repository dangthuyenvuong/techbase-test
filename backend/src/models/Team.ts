import mongoose from "../config/database";

const User = mongoose.model('Team', {
    name: String,
})

export default User;