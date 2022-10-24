import { Request, Response } from "express";
import config from "config";
import { createSession, findSessions } from "../service/session-service";
import { validatePassword } from "../service/user-service";
import { signJwt } from "../utils/jwt-utils";

export const createSessionHandler = async(req: Request, res: Response) => {
    //validate user password
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send("Invalid Credentials")
    }

    //create session for the user
    const session = await createSession(user._id, req.get("user-agent") || "")

    //create accesstoken
    const accessToken = signJwt({...user, session: session._id},{expiresIn: config.get<string>("accessTokenTtl")})

    //refreshToken
    const refreshToken = signJwt({...user, session: session._id},{expiresIn: config.get<string>("accessTokenTtl")})

    //return both tokens
    return res.send({accessToken, refreshToken})
}

export const getUserSessionsHandler = async (req: Request, res:Response) => {
    const userId = res.locals.user._id

    const sessions = await findSessions({userId, valid:false})

    return res.send(sessions)
}