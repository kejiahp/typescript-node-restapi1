import { FilterQuery } from "mongoose"
import Session, { SessionDocument } from "../models/sessions-model"

export const createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({user:userId, userAgent})

    return session.toJSON()
}

export const findSessions = async (query:FilterQuery<SessionDocument>) => {
    return await Session.find({query}).lean()
}