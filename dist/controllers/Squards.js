"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../database/prisma"));
const apiErros_1 = require("../helpers/apiErros");
const utils_1 = require("../utils");
class Squards {
    async create(req, res) {
        const { name } = req.body;
        const getSquard = await new prisma_1.default().getSquard(undefined, name);
        if (getSquard)
            throw new apiErros_1.BadRequestError("equipe ja existe!");
        const createSquard = await new prisma_1.default().createSquard(name);
        if (!createSquard)
            throw new apiErros_1.ServerError("opss estamos com problemas internos !");
        return res.status(201).json({ ...createSquard, players: [] });
    }
    async edit(req, res) {
        const { name, bermuda_position, kalahari_position, purgatorio_position } = req.body;
        const { id } = req.params;
        const getSquard = await new prisma_1.default().getSquard(+id);
        if (!getSquard)
            throw new apiErros_1.NotFoundError("equipe não encontrada!");
        const positions = [
            +bermuda_position,
            +kalahari_position,
            +purgatorio_position,
        ];
        const countPoints = (0, utils_1.somePoints)(positions);
        if (!countPoints && countPoints !== 0)
            throw new apiErros_1.ServerError("opss estamos com problemas internos !");
        const newBooyar = (0, utils_1.countBooyar)(positions, getSquard.booyar);
        if (!newBooyar && newBooyar !== 0)
            throw new apiErros_1.ServerError("opss estamos com problemas internos !");
        const squard = {
            id: +id,
            name,
            booyar: newBooyar,
            points: getSquard.points + countPoints,
            bermuda_position: [...getSquard.bermuda_position, +bermuda_position],
            kalahari_position: [...getSquard.kalahari_position, +kalahari_position],
            purgatorio_position: [
                ...getSquard.purgatorio_position,
                +purgatorio_position,
            ],
        };
        const editSquard = await new prisma_1.default().editSquard(squard);
        if (!editSquard)
            throw new apiErros_1.ServerError("opss estamos com problemas internos !");
        res.status(201).json(editSquard);
    }
    async list(req, res) {
        const listSquards = await new prisma_1.default().listSquards();
        if (!listSquards.length)
            return res.status(200).json([]);
        const players = await new prisma_1.default().listPlayer();
        listSquards.forEach((squard) => {
            squard.players = players.filter((player) => player.squard_id === squard.id);
        });
        listSquards.sort((a, b) => {
            return a.points < b.points ? 1 : a.points > b.points ? -1 : 0;
        });
        return res.status(200).json(listSquards);
    }
    async delete(req, res) {
        const { id } = req.params;
        if (!id) {
            throw new apiErros_1.BadRequestError("informe uma equipe !");
        }
        const getSquard = await new prisma_1.default().getSquard(+id);
        if (!getSquard) {
            throw new apiErros_1.NotFoundError("equipe não encontrada !");
        }
        const deleteSquard = await new prisma_1.default().deleteSquard(+id);
        if (!deleteSquard) {
            throw new apiErros_1.ServerError("não foi possivel excluir a equipe");
        }
        res.status(200).json(deleteSquard);
    }
}
exports.default = Squards;
