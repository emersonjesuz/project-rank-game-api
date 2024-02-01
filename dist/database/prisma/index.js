"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apiErros_1 = require("../../helpers/apiErros");
const prisma = new client_1.PrismaClient();
class Database {
    async createSquard(name) {
        if (!name || !name.trim())
            throw new apiErros_1.BadRequestError("informe o nome da equipe !");
        return await prisma.squards.create({ data: { name } }).catch(() => {
            throw new apiErros_1.ServerError("não foi possivel criar o squard ");
        });
    }
    async getSquard(id, name) {
        if (!id && !name)
            throw new apiErros_1.BadRequestError("informe uma  equipe !");
        if (id) {
            return await prisma.squards.findUnique({ where: { id } }).catch(() => {
                throw new apiErros_1.NotFoundError("equipe não encontrada");
            });
        }
        else {
            return await prisma.squards.findUnique({ where: { name } }).catch(() => {
                throw new apiErros_1.NotFoundError("equipe não encontrada");
            });
        }
    }
    async editSquard(squard, updateKill) {
        if (squard) {
            if (!squard.id || !squard.name)
                throw new apiErros_1.BadRequestError("informe os dados corretamente !");
            return await prisma.squards
                .update({
                data: squard,
                where: { id: squard.id },
            })
                .catch((e) => {
                throw new apiErros_1.ServerError("não foi possivel editar a equipe");
            });
        }
        else if (updateKill) {
            return await prisma.squards
                .update({
                data: { kills: updateKill.kills, points: updateKill.points },
                where: { id: updateKill.id },
            })
                .catch((e) => {
                throw new apiErros_1.ServerError("não foi possivel editar a equipe");
            });
        }
    }
    async listSquards() {
        return await prisma.squards.findMany().catch(() => {
            throw new apiErros_1.ServerError("não foi possivel buscar a lista de equipes");
        });
    }
    async deleteSquard(id) {
        this.deletePlayer(undefined, id);
        return await prisma.squards.delete({ where: { id } }).catch(() => {
            throw new apiErros_1.ServerError("não foi possivel excluir a equipe");
        });
    }
    async createPlayer(name, squard_id) {
        if (!squard_id) {
            throw new apiErros_1.BadRequestError("informe um jogador!");
        }
        if (!name || !name.trim()) {
            throw new apiErros_1.BadRequestError("informe o nome do jogador corretamente !");
        }
        return prisma.players.create({ data: { squard_id, name } }).catch((err) => {
            throw new apiErros_1.ServerError("não foi possivel criar o player");
        });
    }
    async getPlayer(id, name) {
        if (!id && !name)
            throw new apiErros_1.BadRequestError("informe o jogador !");
        if (id) {
            return await prisma.players.findUnique({ where: { id } }).catch(() => {
                throw new apiErros_1.NotFoundError("jogador não encontrada!");
            });
        }
        else {
            return await prisma.players.findUnique({ where: { name } }).catch(() => {
                throw new apiErros_1.NotFoundError("jogador não encontrada!");
            });
        }
    }
    async listPlayer(squard_id) {
        if (squard_id) {
            return await prisma.players
                .findMany({ where: { squard_id } })
                .catch(() => {
                throw new apiErros_1.ServerError("não foi possivel buscar a lista de jogadores !");
            });
        }
        return await prisma.players.findMany().catch(() => {
            throw new apiErros_1.ServerError("não foi possivel buscar a lista de jogadores !");
        });
    }
    async editPlayer(player) {
        const { name, bermuda_kills, kalahari_kills, purgatorio_kills, kills, id } = player;
        if (!id)
            throw new apiErros_1.BadRequestError("informe um jogador!");
        return await prisma.players
            .update({
            data: { bermuda_kills, kalahari_kills, purgatorio_kills, kills, name },
            where: { id },
        })
            .catch(() => {
            throw new apiErros_1.ServerError("não foi possivel editar os dados do jogador !");
        });
    }
    async deletePlayer(id, squard_id) {
        if (id) {
            return await prisma.players.delete({ where: { id } }).catch(() => {
                throw new apiErros_1.ServerError("não foi possivel excluir o jogadores ");
            });
        }
        return await prisma.players
            .deleteMany({
            where: { squard_id },
        })
            .catch(() => {
            throw new apiErros_1.ServerError("não foi possivel excluir os jogadores da equipe");
        });
    }
}
exports.default = Database;
