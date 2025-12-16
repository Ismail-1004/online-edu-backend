import { RoleModel, UserModel } from "../types/models";

export default class UserDto {
    id: number
    email: string
    roles: string[]
    emailVerified: boolean

    constructor(model: UserModel & { Roles? : RoleModel[] }) {
        if (model.id === undefined) {
            throw new Error('User ID is undefined')
        }

        this.id = model.id
        this.email = model.email
        this.roles = model.roles?.map(r => {
            return r.dataValues?.value || r.value;
        }) || [];
        this.emailVerified = Boolean(model.emailVerified)

        console.log('DTO ROLES', this.roles);
        
    }
}