"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.toggleTodoStatus = exports.updateTodo = exports.createTodo = exports.searchTodos = exports.getTodoById = exports.getTodosByUserId = exports.getTodos = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield models_1.TodoModel.findAll();
    res.json(todos);
});
exports.getTodos = getTodos;
const getTodosByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const todos = yield models_1.TodoModel.findAll({
        where: { user_id: userId },
    });
    res.json(todos);
});
exports.getTodosByUserId = getTodosByUserId;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield models_1.TodoModel.findByPk(req.params.id);
    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }
    res.json(todo);
});
exports.getTodoById = getTodoById;
const searchTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
        res.status(400).json({ message: "Missing search query" });
        return;
    }
    const todos = yield models_1.TodoModel.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { title: { [sequelize_1.Op.iLike]: `%${q}%` } },
                { description: { [sequelize_1.Op.iLike]: `%${q}%` } },
            ],
        },
    });
    res.json(todos);
});
exports.searchTodos = searchTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, user_id } = req.body;
    if (!title || !user_id) {
        res.status(400).json({ message: "Title and user_id are required" });
        return;
    }
    try {
        const todo = yield models_1.TodoModel.create({
            title,
            description,
            user_id,
        });
        res.status(201).json(todo);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, date } = req.body;
    try {
        const todo = yield models_1.TodoModel.findByPk(id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        todo.title = title !== null && title !== void 0 ? title : todo.title;
        todo.description = description !== null && description !== void 0 ? description : todo.description;
        todo.date = date !== null && date !== void 0 ? date : todo.date;
        yield todo.save();
        res.json(todo);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.updateTodo = updateTodo;
const toggleTodoStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield models_1.TodoModel.findByPk(id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        todo.completed = !todo.completed;
        todo.date = new Date();
        yield todo.save();
        res.json(todo);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.toggleTodoStatus = toggleTodoStatus;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield models_1.TodoModel.findByPk(id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        yield todo.destroy();
        res.json({ message: "Todo deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.deleteTodo = deleteTodo;
