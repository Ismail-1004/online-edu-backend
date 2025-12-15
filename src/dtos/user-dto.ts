import { UserModel } from "../types/models";

export default class UserDto {
    id: number
    email: string
    role: string
    emailVerified: boolean

    constructor(model: UserModel) {
        if (model.id === undefined) {
            throw new Error('User ID is undefined')
        }

        this.id = model.id
        this.email = model.email
        this.role = model.role as string
        this.emailVerified = Boolean(model.emailVerified)
    }
}