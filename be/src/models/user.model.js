"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: sequelize_1.DataTypes.STRING,
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: sequelize_1.DataTypes.STRING,
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
