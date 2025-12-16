import sequelize from '../config';
import { DataTypes } from 'sequelize';

const UserRole = sequelize.define('user_roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default UserRole;