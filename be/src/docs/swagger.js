"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "API docs for Todo backend using Node.js + PostgreSQL",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/models/*.ts"], // nơi chứa mô tả API
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
