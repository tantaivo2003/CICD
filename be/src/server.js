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
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 4000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.sequelize.authenticate();
            yield db_1.sequelize.sync(); // không tạo lại nếu đã có, hoặc sync({ alter: true })
            app_1.default.listen(PORT, () => {
                console.log(`✅ Server running at http://localhost:${PORT}`);
            });
        }
        catch (err) {
            console.error("❌ DB connection failed:", err);
        }
    });
}
startServer();
