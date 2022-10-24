import { Express } from "express";
import { createSessionHandler, getUserSessionsHandler } from "./controller/session-controller";
import { createUserHandler } from "./controller/user-controller";
import deserializeUser from "./middleware/deserializeUser";
import validateRequest from "./middleware/validateRequest";
import { createSessionSchema } from "./schema/session-schema";
import { createUserSchema } from "./schema/user-schema";

const routes = (app: Express) => {
    //create user
    app.post('/api/users', validateRequest(createUserSchema),createUserHandler)

    //login in user|create session
    app.post('/api/sessions',validateRequest(createSessionSchema), createSessionHandler )

    app.get("/api/sessions", getUserSessionsHandler)
}

export default routes