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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.updateUserInfo = exports.getUserById = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
    }
    const user = yield models_1.UserModel.findByPk(userId, {
        attributes: ["id", "name", "email", "created_at"],
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
});
exports.getUserById = getUserById;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = yield models_1.UserModel.findByPk(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    yield user.save();
    res.json({ message: "User updated", user });
});
exports.updateUserInfo = updateUserInfo;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const { oldPassword, newPassword } = req.body;
    const user = yield models_1.UserModel.findByPk(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const match = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!match) {
        res.status(401).json({ message: "Old password is incorrect" });
        return;
    }
    user.password = yield bcrypt_1.default.hash(newPassword, 10);
    yield user.save();
    res.json({ message: "Password updated" });
});
exports.updateUserPassword = updateUserPassword;
