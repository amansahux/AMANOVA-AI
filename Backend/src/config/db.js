import mongoose from "mongoose"
import config from "./config.js"

const connectToDb = () => {
    mongoose.connect(config.mongo_uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error))
}

export default connectToDb