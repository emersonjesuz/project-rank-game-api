import { SquadInput } from "../dtos/inputs/Squad.inputs";
import { SquadRepository } from "../repositories/Squad.repository";
import { SquadBusinessValidator } from "../validators/SquadBusiness.validator";
import { Validator } from "../validators/Validator";

export class SquadService {
  constructor(
    private squadRepository: SquadRepository,
    private validator: Validator<SquadInput>,
    private squadBusinessValidator: SquadBusinessValidator
  ) {}

  async create(name: string) {
    this.validator.validate({ name });
    await this.squadBusinessValidator.validateSquadNameIsUnique(name);
    await this.squadRepository.create(name);
  }

  async update(input: SquadInput) {
    const squad = await this.squadBusinessValidator.validateIsSquad(input.id!);
    const countBooyarInRound = this.countBooyar(
      input.bermuda_position!,
      input.kalahari_position!,
      input.purgatorio_position!
    );

    squad.setBooyar(countBooyarInRound);
    squad.setBermudaPosition(input.bermuda_position!);
    squad.setKalahariPosition(input.kalahari_position!);
    squad.setPurgatorioPosition(input.purgatorio_position!);
    await this.squadRepository.update(squad);
  }
  async list() {
    return this.squadRepository.findAll();
  }
  private countBooyar(...positions: number[]): number {
    const NUMBER_POSITION_BOOYAR = 1;
    return positions.reduce((acc, position) => {
      if (position === NUMBER_POSITION_BOOYAR) {
        acc++;
      }
      return acc;
    }, 0);
  }
}
