"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ✅ Route Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// ✅ Routes API
app.use("/api/todos", todo_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", user_route_1.default);
exports.default = app;
