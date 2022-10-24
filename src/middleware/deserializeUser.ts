import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt-utils"

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const token = get(req,"headers.authorization", "").replace(/^Bearer\s/,"")

    if(!token) {
        return next()
    }

    const { decoded, expired } = verifyJwt(token)

    if(decoded) {
        res.locals.user = decoded
        return next()
    }
}

export default deserializeUser