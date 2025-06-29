"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = exports.UserModel = void 0;
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return user_model_1.UserModel; } });
const todo_model_1 = require("./todo.model");
Object.defineProperty(exports, "TodoModel", { enumerable: true, get: function () { return todo_model_1.TodoModel; } });
user_model_1.UserModel.hasMany(todo_model_1.TodoModel, { foreignKey: "user_id" });
todo_model_1.TodoModel.belongsTo(user_model_1.UserModel, { foreignKey: "user_id" });
