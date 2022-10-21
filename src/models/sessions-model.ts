import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./user-model";

export interface SessionDocument extends mongoose.Document{
    user: UserDocument["_id"]
    valid: boolean
    createdAt: Date
    updatedAt: Date
    userAgent: string
}

const SessionSchema = new mongoose.Schema<SessionDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    valid: {
        type: Boolean,
        default: false
    },
    userAgent: {type: String}
}, {timestamps: true})


const Session = mongoose.model("Session", SessionSchema)

export default Session