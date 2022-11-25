import jwt, { SignOptions } from "jsonwebtoken"
import config from "config"

const publicKey = config.get<string>("secretKey")
const privateKey = config.get<string>("secretKey")

export const signJwt = (object: object, options?: SignOptions) => {
    // return jwt.sign(object, privateKey, {...(options && options), algorithm:"RS256"})
    return jwt.sign(object, privateKey, {...(options && options)})
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
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}