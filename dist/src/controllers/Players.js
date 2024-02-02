"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../database/prisma"));
const apiErros_1 = require("../helpers/apiErros");
class Player {
    async create(req, res) {
        const { name, squard_id } = req.body;
        const getSquard = await new prisma_1.default().getSquard(squard_id);
        if (!getSquard) {
            throw new apiErros_1.NotFoundError("equipe não encontrada!");
        }
        const getPlayer = await new prisma_1.default().getPlayer(undefined, name);
        if (getPlayer) {
            throw new apiErros_1.BadRequestError("jogador ja existe!");
        }
        const listPlayerInSquard = await new prisma_1.default().listPlayer(squard_id);
        if (listPlayerInSquard.length >= 5) {
            throw new apiErros_1.BadRequestError("equipe ja estar completa !");
        }
        const createPlayer = await new prisma_1.default().createPlayer(name, squard_id);
        if (!createPlayer) {
            throw new apiErros_1.ServerError("não foi possivel criar o jogador !");
        }
        return res.status(201).json(createPlayer);
    }
    async edit(req, res) {
        const { name, bermuda_kills, kalahari_kills, purgatorio_kills } = req.body;
        const { id } = req.params;
        const kills = bermuda_kills + kalahari_kills + purgatorio_kills;
        const getPlayer = await new prisma_1.default().getPlayer(+id);
        const verifyNamePlayer = await new prisma_1.default().getPlayer(undefined, name);
        if (!getPlayer) {
            throw new apiErros_1.NotFoundError("jogador não encontrado !");
        }
        if (verifyNamePlayer && verifyNamePlayer.id !== getPlayer.id) {
            throw new apiErros_1.NotFoundError("jogador ja existe!");
        }
        const dataPlayer = {
            name,
            bermuda_kills: [...getPlayer.bermuda_kills, bermuda_kills],
            kalahari_kills: [...getPlayer.kalahari_kills, kalahari_kills],
            purgatorio_kills: [...getPlayer.purgatorio_kills, purgatorio_kills],
            kills: kills + getPlayer.kills,
            id: +id,
        };
        const editPlayer = await new prisma_1.default().editPlayer(dataPlayer);
        if (!editPlayer)
            throw new apiErros_1.ServerError("não foi possivel editar o jogador!");
        const getSquard = await new prisma_1.default().getSquard(editPlayer.squard_id);
        if (!getSquard)
            throw new apiErros_1.ServerError("tivemos problemas ao salvar os abates da equipe");
        await new prisma_1.default().editSquard(undefined, {
            id: editPlayer.squard_id,
            kills: kills + getSquard.kills,
            points: kills + getSquard.points,
        });
        return res.status(201).json(editPlayer);
    }
    async list(req, res) {
        const listPlayers = await new prisma_1.default().listPlayer();
        listPlayers.sort((a, b) => a.kills < b.kills ? 1 : a.kills > b.kills ? -1 : 0);
        return res.status(200).json(listPlayers !== null && listPlayers !== void 0 ? listPlayers : []);
    }
    async delete(req, res) {
        const { id } = req.params;
        if (!id)
            throw new apiErros_1.BadRequestError("informe um jogador !");
        const getPlayer = await new prisma_1.default().getPlayer(+id);
        if (!getPlayer)
            throw new apiErros_1.NotFoundError("jogador não encontrado");
        const deletePlayer = await new prisma_1.default().deletePlayer(+id);
        if (!deletePlayer)
            throw new apiErros_1.ServerError("não foi possivel excluir o jogador");
        return res.status(200).json(deletePlayer);
    }
}
exports.default = Player;
