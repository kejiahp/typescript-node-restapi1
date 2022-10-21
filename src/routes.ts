import { Express } from "express";
import { createUserHandler } from "./controller/user-controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user-schema";

const routes = (app: Express) => {
    //create user
    app.post('/api/users', validateRequest(createUserSchema),createUserHandler)
}

export default routes