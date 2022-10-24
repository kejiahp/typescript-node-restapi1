import jwt, { SignOptions } from "jsonwebtoken"
import config from "config"

const publicKey = config.get<string>("publicKey")
const privateKey = config.get<string>("privateKey")

export const signJwt = (object: object, options?: SignOptions) => {
    return jwt.sign(object, privateKey, {...(options && options), algorithm:"RS256"})
}


export const verifyJwt = (token: string) => {
    try{
        const decoded = jwt.verify(token, publicKey)

        return {
            valid: true,
            expired: false,
            decoded
        }
    }catch(e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}