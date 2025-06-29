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
exports.login = exports.register = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // Kiểm tra trùng email
        const existingUser = yield models_1.UserModel.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield models_1.UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User created", user: { id: newUser.id, email: newUser.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.UserModel.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.login = login;
