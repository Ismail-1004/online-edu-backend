import sequelize from '../config';
import { DataTypes } from 'sequelize';
import { TokenModel } from '../../types/models';

const Token = sequelize.define<TokenModel>('token', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: "id"
        }
    }
})

export default Token