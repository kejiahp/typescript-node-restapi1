import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Invalid email"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short - must be a minimum of 6 characters"),
        passwordConfirmation: string({
            required_error: "Confirmation password is required"
        })
    }).refine((data)=>data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })

})

//creating a custom type for the registering users using the createUserSchema
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">