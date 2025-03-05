import {
  PlayerCreateInput,
  PlayerInput,
  PlayerUpdateInput,
} from "../dtos/inputs/Player.input";
import { PlayerRepository } from "../repositories/Player.repository";
import { PlayerBusinessValidator } from "../validators/PlayerBusiness.validator";
import { SquadBusinessValidator } from "../validators/SquadBusiness.validator";
import { Validator } from "../validators/Validator";

export class PlayerService {
  constructor(
    private playerRepository: PlayerRepository,
    private validator: Validator<PlayerInput>,
    private playerBusinessValidator: PlayerBusinessValidator,
    private squadBusinessValidator: SquadBusinessValidator
  ) {}

  async create(input: PlayerCreateInput) {
    this.validator.validate(input);
    await this.squadBusinessValidator.validateIsSquad(input.squad_id);
    await this.playerBusinessValidator.validatePlayerIsNameUnique(input.name);
    await this.squadBusinessValidator.validateNumberPlayerInSquadGreater5(
      input.squad_id
    );
    await this.playerRepository.create(input);
  }

  async update(input: PlayerUpdateInput) {
    this.validator.validate(input);
    const player = await this.playerBusinessValidator.ValidateIsPlayerById(
      input.id
    );
    await this.playerBusinessValidator.validateIsPlayerNameChangedAndUnique(
      input.id,
      input.name
    );
    const totalKills: number =
      input.bermuda_kills + input.kalahari_kills + input.purgatorio_kills;
    player.setName(input.name);
    player.setBermudaKills(input.bermuda_kills);
    player.setKalahariKills(input.kalahari_kills);
    player.setPurgatorioKills(input.purgatorio_kills);
    player.setKills(totalKills);
    await this.playerRepository.update(player);
  }

  list() {
    return this.playerRepository.findAll();
  }
  async delete(id: number) {
    this.validator.validate({ id });
    await this.playerBusinessValidator.ValidateIsPlayerById(id);
    await this.playerRepository.delete(id);
  }
}
