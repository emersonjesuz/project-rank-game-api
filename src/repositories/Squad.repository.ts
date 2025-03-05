import { PrismaService } from "../config/prisma";
import { PlayerModel } from "../models/Player.model";
import { SquadModel } from "../models/Squad.model";

export interface SquadRepository {
  create(name: string): Promise<void>;
  update(squad: SquadModel): Promise<void>;
  findById(id: number): Promise<SquadModel | null>;
  findByName(name: string): Promise<SquadModel | null>;
  findAll(): Promise<SquadModel[]>;
}

export class SquadPrismaRepository implements SquadRepository {
  private prisma: PrismaService;
  constructor() {
    this.prisma = new PrismaService();
  }

  async create(name: string): Promise<void> {
    await this.prisma.squards.create({ data: { name } });
  }

  async update(squad: SquadModel): Promise<void> {
    await this.prisma.squards.update({
      where: {
        id: squad.getId(),
      },
      data: {
        bermuda_position: squad.getBermudaPosition(),
        kalahari_position: squad.getKalahariPosition(),
        purgatorio_position: squad.getKalahariPosition(),
        name: squad.getName(),
        booyar: squad.getBooyar(),
        points: squad.getPoints(),
        kills: squad.getKills(),
      },
    });
  }

  async findById(id: number): Promise<SquadModel | null> {
    const squad = await this.prisma.squards.findUnique({
      where: { id },
      include: { Players: true },
    });
    if (!squad) return null;

    const players = squad.Players.map(
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

    return new SquadModel(
      squad.id,
      squad.name,
      squad.kills,
      squad.points,
      squad.booyar,
      squad.bermuda_position,
      squad.purgatorio_position,
      squad.kalahari_position,
      players
    );
  }
  async findByName(name: string): Promise<SquadModel | null> {
    const squad = await this.prisma.squards.findFirst({
      where: { name },
      include: { Players: true },
    });
    if (!squad) return null;

    const players = squad.Players.map(
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

    return new SquadModel(
      squad.id,
      squad.name,
      squad.kills,
      squad.points,
      squad.booyar,
      squad.bermuda_position,
      squad.purgatorio_position,
      squad.kalahari_position,
      players
    );
  }
  async findAll(): Promise<SquadModel[]> {
    const squads = await this.prisma.squards.findMany({
      include: { Players: true },
    });

    return squads.map(
      (squad) =>
        new SquadModel(
          squad.id,
          squad.name,
          squad.kills,
          squad.points,
          squad.booyar,
          squad.bermuda_position,
          squad.purgatorio_position,
          squad.kalahari_position,
          squad.Players.map(
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
          )
        )
    );
  }
}
