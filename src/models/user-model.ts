import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"

export interface UserDocument extends mongoose.Document{
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(password:string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})


UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next()
    }

    const saltRound = config.get<number>("saltWorkFactor")

    const salt = await bcrypt.genSalt(saltRound)

    this.password = await bcrypt.hash(this.password, salt)

    return next()
})

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean>{
    return bcrypt.compare(password, this.password).catch(e=>false)
}

const User = mongoose.model<UserDocument>("User", UserSchema)

export default User