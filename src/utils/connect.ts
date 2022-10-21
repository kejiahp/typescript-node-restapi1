import mongoose from "mongoose";
import config from 'config'
import log from "./logger";

const connect = async () => {
    const dbUri = config.get<string>("dbUri")

    try{
        await mongoose.connect(dbUri)
        log.info("connected to DB")
    }catch(error) {
        log.error("could not connect to DB")
        process.exit(1)
    }
}

export default connect