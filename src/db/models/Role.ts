import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Role = sequelize.define('role', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique: true, allowNull: false }
})

export default Role