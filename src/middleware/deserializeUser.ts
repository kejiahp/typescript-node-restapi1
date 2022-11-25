import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session-service";
import { verifyJwt } from "../utils/jwt-utils"

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = get(req,"headers.authorization", "").replace(/^Bearer\s/,"")
    console.log("[TOKEN]", token)

    const refreshToken = get(req, "headers.x-refresh")

    if(!token) {
        return next()
    }

    const { decoded, expired } = verifyJwt(token)

    if(decoded) {
        res.locals.user = decoded
        return next()
    }

    if(expired && refreshToken) {
        let newAccessToken = await reIssueAccessToken({refreshToken})

        if(newAccessToken) {
            res.setHeader("x-access-token", newAccessToken)
        }

        if(!newAccessToken) {
            newAccessToken = ""
        }


        const result = verifyJwt(newAccessToken)

        res.locals.user = result.decoded

        return next()
    }

    return next()
}

export default deserializeUser