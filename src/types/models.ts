import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    ForeignKey
} from 'sequelize'

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>,
  email: string,
  passwordHash: string,
  firstName?: string,
  secondName?: string,
  avatar?: string,
  bio?: string,
  role?: CreationOptional<'USER' | 'AUTHOR' | 'ADMIN'>,
  emailVerified?: boolean,
  activationLink?: string
}

export interface TokenModel
  extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
  id: CreationOptional<number>
  refreshToken: string
  userId: ForeignKey<number>
}
