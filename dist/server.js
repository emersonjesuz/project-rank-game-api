"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const routers_1 = __importDefault(require("./routers"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(routers_1.default);
server.use(errorMiddleware_1.errorMiddleware);
exports.default = server;
