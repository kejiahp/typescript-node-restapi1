import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../models/user-model";


export const createUser = async(input: DocumentDefinition<Omit<UserDocument, "createdAt"|"updatedAt"|"comparePassword">>) => {
    try{
        const user = await User.create(input)
        return omit(user.toJSON(), "password")
    }catch(e:any){
        throw new Error(e)
    }
}