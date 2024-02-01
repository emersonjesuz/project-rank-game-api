"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiErros_1 = require("../../helpers/apiErros");
class SquardMiddlerware {
    create(req, res, next) {
        const { name } = req.body;
        if (!name || !name.trim())
            throw new apiErros_1.BadRequestError("informe o nome da equipe !");
        next();
    }
    edit(req, res, next) {
        const { name, bermuda_position, kalahari_position, purgatorio_position } = req.body;
        if (!name || !name.trim())
            throw new apiErros_1.BadRequestError("informe o nome da equipe !");
        const bermuda = bermuda_position >= 0 && bermuda_position <= 12;
        const kalahari = kalahari_position >= 0 && kalahari_position <= 12;
        const purgatorio = purgatorio_position >= 0 && purgatorio_position <= 12;
        if (!bermuda || !kalahari || !purgatorio)
            throw new apiErros_1.BadRequestError("posição da equipe invalido !");
        next();
    }
}
exports.default = SquardMiddlerware;
