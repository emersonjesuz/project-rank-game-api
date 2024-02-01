"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = async (err, req, res, next) => {
    var _a;
    const statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500;
    if (statusCode === 401 ||
        err.message === "invalid token" ||
        err.message === "invalid signature") {
        return res.status(401).json({ message: "Não altorizado!" });
    }
    if (statusCode === 500) {
        return res.status(500).json({ message: "Erro interno do servidor!" });
    }
    if (statusCode === 5000) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(statusCode).json({ message: err.message });
};
exports.errorMiddleware = errorMiddleware;
