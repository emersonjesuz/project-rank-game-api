import {
  MaxPlayersInSquadError,
  SquadNameIsNotUniqueError,
} from "../errors/BadRequestError";
import { SquadNotFoundError } from "../errors/NotFoundError";
import { SquadModel } from "../models/Squad.model";

import { SquadRepository } from "../repositories/Squad.repository";

export class SquadBusinessValidator {
  constructor(private squadRepository: SquadRepository) {}
  async validateIsSquad(squad_id: number): Promise<SquadModel> {
    const squad = await this.squadRepository.findById(squad_id);
    if (squad === null) {
      throw new SquadNotFoundError();
    }
    return squad;
  }
  async validateSquadNameIsUnique(name: string) {
    if ((await this.squadRepository.findByName(name)) !== null) {
      throw new SquadNameIsNotUniqueError();
    }
  }
  async validateNumberPlayerInSquadGreater5(squad_id: number) {
    const squad = await this.squadRepository.findById(squad_id);
    const quantityPlayersInSquad = !squad ? 0 : squad.getPlayers().length;
    const MAX_PLAYERS_IN_SQUAD = 5;
    if (quantityPlayersInSquad >= MAX_PLAYERS_IN_SQUAD) {
      throw new MaxPlayersInSquadError();
    }
  }
}
