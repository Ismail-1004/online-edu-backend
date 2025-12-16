import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ForeignKey,
    NonAttribute,
    Transaction
} from 'sequelize'

export interface RoleModel
  extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
  id: CreationOptional<number>
  value: string
}


export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>,
  email: string,
  passwordHash: string,
  firstName?: string,
  secondName?: string,
  avatar?: string,
  bio?: string,
  emailVerified?: boolean,
  activationLink?: string

  roles?: NonAttribute<RoleModel[]>;
  Roles?: NonAttribute<RoleModel[]>;

  getRoles: (options?: { transaction?: Transaction }) => Promise<RoleModel[]>;
  addRole: (role: RoleModel | number, options?: { transaction?: Transaction }) => Promise<void>;
  addRoles: (roles: RoleModel[] | number[], options?: { transaction?: Transaction }) => Promise<void>;
  setRoles: (roles: RoleModel[] | number[], options?: { transaction?: Transaction }) => Promise<void>;
  removeRole: (role: RoleModel | number, options?: { transaction?: Transaction }) => Promise<void>;
  hasRole: (role: RoleModel | number, options?: { transaction?: Transaction }) => Promise<boolean>;
}

export interface TokenModel
  extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
  id: CreationOptional<number>
  refreshToken: string
  userId: ForeignKey<number>
}
