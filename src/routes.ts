import { Express } from "express";
import { createSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session-controller";
import { createUserHandler } from "./controller/user-controller";
import requireUser from "./middleware/requireUser";
import validateRequest from "./middleware/validateRequest";
import { createSessionSchema } from "./schema/session-schema";
import { createUserSchema } from "./schema/user-schema";

const routes = (app: Express) => {
    //create user
    app.post('/api/users', validateRequest(createUserSchema),createUserHandler)

    //login in user|create session
    app.post('/api/sessions',validateRequest(createSessionSchema), createSessionHandler )

    app.get("/api/sessions", requireUser,getUserSessionsHandler)

    app.delete("/api/sessions", requireUser, deleteSessionHandler)
}

export default routes