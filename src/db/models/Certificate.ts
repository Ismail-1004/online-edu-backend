import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Certificate = sequelize.define('certificate', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    certificateNumber: { type: DataTypes.STRING },
    issuedAt: { type: DataTypes.DATE }
})

export default Certificate