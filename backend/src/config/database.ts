import dotenv from 'dotenv'
import { ConnectOptions } from 'mongoose'
dotenv.config()



const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_HOST = process.env.MONGO_URL || 'localhost'



const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 27017
const DATABASE_NAME = process.env.MONGO_DATABASE || 'test'


const MONGO_OPTIONS: ConnectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    dbName: DATABASE_NAME
}


const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    dbName: DATABASE_NAME
}

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config

// let stringconnect = `mongodb://${config.USERNAME}:${config.PASSWORD}@localhost:27017/${config.DATABASE}`

// mongoose.connect(stringconnect, { useNewUrlParser: true, useUnifiedTopology: true })
// export default mongoose