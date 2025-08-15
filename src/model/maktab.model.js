
import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Maktab = sequelize.define('Maktab', {
    maktab: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
});

export default Maktab;
