import { SquadInput } from "../dtos/inputs/Squad.inputs";
import { SquadModel } from "../models/Squad.model";
import {
  SquadPrismaRepository,
  SquadRepository,
} from "../repositories/Squad.repository";
import { SquadService } from "../services/Squad.service";
import { SquadValidator } from "../validators/Squad.validator";
import { SquadBusinessValidator } from "../validators/SquadBusiness.validator";
import { Validator } from "../validators/Validator";

export class SquadFactoryService {
  private squadRepository: SquadRepository;
  private validator: Validator<SquadInput>;
  private squadBusinessValidator: SquadBusinessValidator;
  private squadService: SquadService;

  constructor() {
    this.squadRepository = new SquadPrismaRepository();
    this.validator = new SquadValidator();
    this.squadBusinessValidator = new SquadBusinessValidator(
      this.squadRepository
    );
    this.squadService = new SquadService(
      this.squadRepository,
      this.validator,
      this.squadBusinessValidator
    );
  }

  async create(name: string) {
    await this.squadService.create(name);
  }

  async update(input: SquadInput) {
    await this.squadService.update(input);
  }
  async list(): Promise<SquadModel[]> {
    return this.squadService.list();
  }
}
