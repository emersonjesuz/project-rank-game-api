import {
  KillsIsNotNumberError,
  KillsIsNotPositiveError,
  PlayerNameIsNotUniqueError,
} from "../errors/BadRequestError";
import { PlayerNotFoundError } from "../errors/NotFoundError";
import { PlayerModel } from "../models/Player.model";
import { PlayerRepository } from "../repositories/Player.repository";

export class PlayerBusinessValidator {
  constructor(private playerRepository: PlayerRepository) {}

  async ValidateIsPlayerById(id: number): Promise<PlayerModel> {
    const isPlayer = await this.playerRepository.findById(id);
    if (isPlayer === null) {
      throw new PlayerNotFoundError();
    }
    return isPlayer;
  }
  async validatePlayerIsNameUnique(name: string) {
    if ((await this.playerRepository.findByName(name)) !== null) {
      throw new PlayerNameIsNotUniqueError();
    }
  }
  validateKillsIsNumber(...kills: number[]) {
    if (kills.some((kill) => isNaN(kill))) {
      throw new KillsIsNotNumberError();
    }
  }
  validateKillsIsNotNumberNegative(...kills: number[]) {
    if (kills.some((kill) => kill < 0)) {
      throw new KillsIsNotPositiveError();
    }
  }
  async validateIsPlayerNameChangedAndUnique(id: number, name: string) {
    const isPlayerById = await this.playerRepository.findById(id);
    const isPlayerByName = await this.playerRepository.findByName(name);
    const existsPlayerName =
      isPlayerById &&
      isPlayerByName &&
      isPlayerById.getId() !== isPlayerByName.getId();
    if (existsPlayerName) {
      throw new PlayerNameIsNotUniqueError();
    }
  }
}
