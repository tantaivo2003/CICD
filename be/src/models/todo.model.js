"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class TodoModel extends sequelize_1.Model {
}
exports.TodoModel = TodoModel;
TodoModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    date: sequelize_1.DataTypes.DATE,
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Todo",
    tableName: "todos",
    timestamps: false,
});
