import { NextFunction, Request, Response } from "express";
import config from "config";
import { createSession, findSessions, updateSession } from "../service/session-service";
import { validatePassword } from "../service/user-service";
import { signJwt } from "../utils/jwt-utils";

export const createSessionHandler = async(req: Request, res: Response) => {
    //validate user password
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send("Invalid Credentials")
    }
    console.log("[USER]", user)

    //create session for the user
    const session = await createSession(user._id, req.get("user-agent") || "")
    console.log("[SESSION]", session)

    //create accesstoken
    const accessToken = signJwt({...user, session: session._id},{expiresIn: config.get("accessTokenTtl")})

    //refreshToken
    const refreshToken = signJwt({...user, session: session._id},{expiresIn: config.get("refreshTokenTtl")})

    //return both tokens
    return res.send({accessToken, refreshToken})
}

export const getUserSessionsHandler = async (req: Request, res:Response) => {
    const userId = res.locals.user._id

    const sessions = await findSessions({userId, valid:true})

    return res.send(sessions)
}

export const deleteSessionHandler = async (req: Request, res:Response, next: NextFunction) => {
    const session = res.locals.user.session

    await updateSession({_id: session}, {valid: false})

    return res.send({
        accessToken: null,
        refreshToken: null
    })
}