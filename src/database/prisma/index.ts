import { PrismaClient } from "@prisma/client";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../../helpers/apiErros";
import { playerType, squardType } from "../../types";

const prisma = new PrismaClient();

export default class Database {
  async createSquard(name: string) {
    if (!name || !name.trim())
      throw new BadRequestError("informe o nome da equipe !");

    return await prisma.squards.create({ data: { name } }).catch(() => {
      throw new ServerError("não foi possivel criar o squard ");
    });
  }

  async getSquard(id?: number, name?: string) {
    if (!id && !name) throw new BadRequestError("informe uma  equipe !");

    if (id) {
      return await prisma.squards.findUnique({ where: { id } }).catch(() => {
        throw new NotFoundError("equipe não encontrada");
      });
    } else {
      return await prisma.squards.findUnique({ where: { name } }).catch(() => {
        throw new NotFoundError("equipe não encontrada");
      });
    }
  }
  async editSquard(
    squard?: squardType,
    updateKill?: { id: number; kills: number; points: number }
  ) {
    if (squard) {
      if (!squard.id || !squard.name)
        throw new BadRequestError("informe os dados corretamente !");

      return await prisma.squards
        .update({
          data: squard,
          where: { id: squard.id },
        })
        .catch((e) => {
          throw new ServerError("não foi possivel editar a equipe");
        });
    } else if (updateKill) {
      return await prisma.squards
        .update({
          data: { kills: updateKill.kills, points: updateKill.points },
          where: { id: updateKill.id },
        })
        .catch((e) => {
          throw new ServerError("não foi possivel editar a equipe");
        });
    }
  }

  async listSquards() {
    return await prisma.squards.findMany().catch(() => {
      throw new ServerError("não foi possivel buscar a lista de equipes");
    });
  }

  async deleteSquard(id: number) {
    this.deletePlayer(undefined, id);

    return await prisma.squards.delete({ where: { id } }).catch(() => {
      throw new ServerError("não foi possivel excluir a equipe");
    });
  }

  async createPlayer(name: string, squard_id: number) {
    if (!squard_id) {
      throw new BadRequestError("informe um jogador!");
    }
    if (!name || !name.trim()) {
      throw new BadRequestError("informe o nome do jogador corretamente !");
    }

    return prisma.players.create({ data: { squard_id, name } }).catch((err) => {
      throw new ServerError("não foi possivel criar o player");
    });
  }

  async getPlayer(id?: number, name?: string) {
    if (!id && !name) throw new BadRequestError("informe o jogador !");

    if (id) {
      return await prisma.players.findUnique({ where: { id } }).catch(() => {
        throw new NotFoundError("jogador não encontrada!");
      });
    } else {
      return await prisma.players.findUnique({ where: { name } }).catch(() => {
        throw new NotFoundError("jogador não encontrada!");
      });
    }
  }

  async listPlayer(squard_id?: number) {
    if (squard_id) {
      return await prisma.players
        .findMany({ where: { squard_id } })
        .catch(() => {
          throw new ServerError(
            "não foi possivel buscar a lista de jogadores !"
          );
        });
    }
    return await prisma.players.findMany().catch(() => {
      throw new ServerError("não foi possivel buscar a lista de jogadores !");
    });
  }

  async editPlayer(player: playerType) {
    const { name, bermuda_kills, kalahari_kills, purgatorio_kills, kills, id } =
      player;

    if (!id) throw new BadRequestError("informe um jogador!");

    return await prisma.players
      .update({
        data: { bermuda_kills, kalahari_kills, purgatorio_kills, kills, name },
        where: { id },
      })
      .catch(() => {
        throw new ServerError("não foi possivel editar os dados do jogador !");
      });
  }

  async deletePlayer(id?: number, squard_id?: number) {
    if (id) {
      return await prisma.players.delete({ where: { id } }).catch(() => {
        throw new ServerError("não foi possivel excluir o jogadores ");
      });
    }
    return await prisma.players
      .deleteMany({
        where: { squard_id },
      })
      .catch(() => {
        throw new ServerError(
          "não foi possivel excluir os jogadores da equipe"
        );
      });
  }
}
