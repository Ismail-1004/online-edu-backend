import sequelize from '../config';
import { DataTypes } from 'sequelize';

const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
})

export default Favorite;