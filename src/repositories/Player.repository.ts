import { PrismaService } from "../config/prisma";
import { PlayerCreateInput } from "../dtos/inputs/Player.input";
import { PlayerModel } from "../models/Player.model";

export interface PlayerRepository {
  create(input: PlayerCreateInput): Promise<void>;
  update(model: PlayerModel): Promise<void>;
  findByName(name: string): Promise<PlayerModel | null>;
  findById(id: number): Promise<PlayerModel | null>;
  findAll(): Promise<PlayerModel[]>;
  delete(id: number): Promise<void>;
}

export class PlayerPrismaRepository implements PlayerRepository {
  private prisma = new PrismaService();

  async create(input: PlayerCreateInput): Promise<void> {
    await this.prisma.players.create({
      data: {
        name: input.name,
        squard_id: input.squad_id,
      },
    });
  }

  async update(model: PlayerModel): Promise<void> {
    await this.prisma.players.update({
      where: {
        id: model.getId(),
      },
      data: {
        bermuda_kills: model.getBermudaKills(),
        kalahari_kills: model.getKalahariKills(),
        purgatorio_kills: model.getPurgatorioKills(),
        kills: model.getKills(),
        name: model.getName(),
      },
    });
  }
  async findByName(name: string): Promise<PlayerModel | null> {
    const player = await this.prisma.players.findFirst({ where: { name } });
    return !player
      ? null
      : new PlayerModel(
          player.id,
          player.name,
          player.squard_id,
          player.bermuda_kills,
          player.purgatorio_kills,
          player.kalahari_kills,
          player.kills
        );
  }
  async findById(id: number): Promise<PlayerModel | null> {
    const player = await this.prisma.players.findUnique({ where: { id } });
    return !player
      ? null
      : new PlayerModel(
          player.id,
          player.name,
          player.squard_id,
          player.bermuda_kills,
          player.purgatorio_kills,
          player.kalahari_kills,
          player.kills
        );
  }
  async findAll(): Promise<PlayerModel[]> {
    const players = await this.prisma.players.findMany({
      orderBy: {
        kills: "asc",
      },
    });
    return players.map(
      (player) =>
        new PlayerModel(
          player.id,
          player.name,
          player.squard_id,
          player.bermuda_kills,
          player.purgatorio_kills,
          player.kalahari_kills,
          player.kills
        )
    );
  }
  async delete(id: number): Promise<void> {
    await this.prisma.players.delete({ where: { id } });
  }
}
