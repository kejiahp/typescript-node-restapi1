import { Request,Response } from "express"
import log from "../utils/logger"
import { createUser } from "../service/user-service"
import {CreateUserInput} from  "../schema/user-schema"
import { omit } from "lodash"

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput["body"]>, res:Response ) => {
    try{
        const user = await createUser(req.body)
        return res.status(200).send(user)
    }catch(e: any){
        log.error(e)
        return res.status(409).send(e.message)
    }
}