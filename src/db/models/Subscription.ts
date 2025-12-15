import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Subscription = sequelize.define('subscription', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    plan: { type: DataTypes.ENUM('FREE', 'PRO', 'PREMIUM'), defaultValue: 'FREE' },
    status: { type: DataTypes.ENUM('active', 'expired', 'canceled'), defaultValue: 'active' }
})

export default Subscription