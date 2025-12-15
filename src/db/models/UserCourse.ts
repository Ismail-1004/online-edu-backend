import sequelize from '../config';
import { DataTypes } from 'sequelize';

const UserCourse = sequelize.define('UserCourse', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
    completedAt: { type: DataTypes.DATE }
})

export default UserCourse