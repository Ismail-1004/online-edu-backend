import sequelize from '../config';
import { DataTypes } from 'sequelize';
import { UserModel } from '../../types/models';

const User = sequelize.define<UserModel>('user', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: true },
    secondName: { type: DataTypes.STRING, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.TEXT }
})

export default User;