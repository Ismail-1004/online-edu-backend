import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Payment = sequelize.define('payment', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
    currency: { type: DataTypes.STRING },
    type: { type: DataTypes.ENUM('subscription', 'course') },
    status: { type: DataTypes.STRING }
})

export default Payment