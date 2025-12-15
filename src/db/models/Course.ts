import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Course = sequelize.define('course', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    level: { type: DataTypes.STRING },
    language: { type: DataTypes.STRING }
})

export default Course