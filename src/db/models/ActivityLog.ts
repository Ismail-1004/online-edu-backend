import sequelize from '../config';
import { DataTypes } from 'sequelize';

const ActivityLog = sequelize.define('activityLog', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    entityId: { type: DataTypes.STRING }
})

export default ActivityLog