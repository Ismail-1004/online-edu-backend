import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Lesson = sequelize.define('lesson', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    videoUrl: { type: DataTypes.STRING },
    duration: { type: DataTypes.STRING },
    order: { type: DataTypes.INTEGER }
})

export default Lesson