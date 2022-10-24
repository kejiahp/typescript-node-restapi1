import { object, string } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({required_error: "Email in required"}).email("Invalid Email"),
        password: string({required_error:"Password is required"})
    })
})