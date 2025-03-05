import {
  PlayerCreateInput,
  PlayerUpdateInput,
} from "../dtos/inputs/Player.input";
import { PlayerModel } from "../models/Player.model";
import { PlayerPrismaRepository } from "../repositories/Player.repository";
import { SquadPrismaRepository } from "../repositories/Squad.repository";
import { PlayerService } from "../services/Player.service";
import {
  PlayerCreateValidator,
  PlayerDeleteValidator,
  PlayerUpdateValidator,
} from "../validators/Player.validator";
import { PlayerBusinessValidator } from "../validators/PlayerBusiness.validator";
import { SquadBusinessValidator } from "../validators/SquadBusiness.validator";

export class PlayerFactoryService {
  private playerRepository: PlayerPrismaRepository;
  private squadRepository: SquadPrismaRepository;
  private squadBusinessValidator: SquadBusinessValidator;
  private playerCreateValidator: PlayerCreateValidator;
  private playerUpdateValidator: PlayerUpdateValidator;
  private playerDeleteValidator: PlayerDeleteValidator;
  private playerBusinessValidator: PlayerBusinessValidator;
  private playerService: PlayerService;

  constructor() {
    this.playerRepository = new PlayerPrismaRepository();
    this.squadRepository = new SquadPrismaRepository();
    this.squadBusinessValidator = new SquadBusinessValidator(
      this.squadRepository
    );
    this.playerCreateValidator = new PlayerCreateValidator();
    this.playerUpdateValidator = new PlayerUpdateValidator();
    this.playerDeleteValidator = new PlayerDeleteValidator();
    this.playerBusinessValidator = new PlayerBusinessValidator(
      this.playerRepository
    );

    this.playerService = new PlayerService(
      this.playerRepository,
      this.playerCreateValidator,
      this.playerBusinessValidator,
      this.squadBusinessValidator
    );
  }

  async create(input: PlayerCreateInput): Promise<void> {
    await this.playerService.create(input);
  }

  async update(input: PlayerUpdateInput): Promise<void> {
    const playerService = new PlayerService(
      this.playerRepository,
      this.playerUpdateValidator,
      this.playerBusinessValidator,
      this.squadBusinessValidator
    );
    await playerService.update(input);
  }
  list(): Promise<PlayerModel[]> {
    const playerService = new PlayerService(
      this.playerRepository,
      this.playerUpdateValidator,
      this.playerBusinessValidator,
      this.squadBusinessValidator
    );
    return playerService.list();
  }
  async delete(id: number): Promise<void> {
    const playerService = new PlayerService(
      this.playerRepository,
      this.playerDeleteValidator,
      this.playerBusinessValidator,
      this.squadBusinessValidator
    );
    await playerService.delete(+id);
  }
}
