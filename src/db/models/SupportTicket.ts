import sequelize from '../config';
import { DataTypes } from 'sequelize';

const SupportTicket = sequelize.define('supportTicket', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    subject: { type: DataTypes.STRING },
    message: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('open', 'closed'), defaultValue: "open" },
    closedAt: { type: DataTypes.DATE }
})

export default SupportTicket