"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiErros_1 = require("../../helpers/apiErros");
class PlayerMidlleware {
    create(req, res, next) {
        const { name, squard_id } = req.body;
        if (!squard_id) {
            throw new apiErros_1.BadRequestError("informe um jogador!");
        }
        if (!name || !name.trim()) {
            throw new apiErros_1.BadRequestError("informe o nome do jogador corretamente !");
        }
        next();
    }
    edit(req, res, next) {
        const { name, bermuda_kills, kalahari_kills, purgatotrio_kills } = req.body;
        const { id } = req.params;
        if (!id) {
            throw new apiErros_1.InvalidFormatError("informe o jogador !");
        }
        if (!name || !name.trim()) {
            throw new apiErros_1.BadRequestError("informe o nome do jogador corretamente !");
        }
        if (bermuda_kills < 0 || purgatotrio_kills < 0 || kalahari_kills < 0) {
            throw new apiErros_1.BadRequestError("A quantidade de  abates do jogador esta invalida!");
        }
        next();
    }
}
exports.default = PlayerMidlleware;
