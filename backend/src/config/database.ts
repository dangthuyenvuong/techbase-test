const mongoose = require('mongoose')
const config = {
    "DATABASE": "techbase-test",
    "USERNAME": "techbase-test",
    "PASSWORD": "techbase-test",
    // "stringConnect": "mongodb://localhost:27017"
}

let stringconnect = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@cluster0.ticyv.mongodb.net/${config.DATABASE}`

mongoose.connect(stringconnect, { useNewUrlParser: true, useUnifiedTopology: true })
export default mongoose