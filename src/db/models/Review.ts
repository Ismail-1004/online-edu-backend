import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Review = sequelize.define('Review', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER },
    comment: { type: DataTypes.TEXT }
})

export default Review