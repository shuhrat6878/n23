
import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Sinf = sequelize.define('Sinf', {
    sinf: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
});

export default Sinf;
