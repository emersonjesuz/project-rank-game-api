import {
  PlayerCreateInput,
  PlayerInput,
  PlayerUpdateInput,
} from "../dtos/inputs/Player.input";
import {
  PlayerIdIsEmptyError,
  PlayerNameIsEmptyError,
  SquadIdIsEmptyError,
} from "../errors/BadRequestError";
import { Validator } from "./Validator";

export class PlayerCreateValidator implements Validator<PlayerInput> {
  private validateSquadIdIsEmpty = new ValidateSquadIdIsEmpty();
  private validatePlayerNameIsEmpty = new ValidatePlayerNameIsEmpty();
  validate(model: PlayerInput): void {
    this.validateSquadIdIsEmpty.validate(model.squad_id!);
    this.validatePlayerNameIsEmpty.validate(model.name!);
  }
}

export class PlayerUpdateValidator implements Validator<PlayerInput> {
  private validatePlayerNameIsEmpty = new ValidatePlayerNameIsEmpty();
  private validatePlayerIdIsEmpty = new ValidatePlayerIdIsEmpty();

  validate(model: PlayerInput): void {
    this.validatePlayerNameIsEmpty.validate(model.name!);
    this.validatePlayerIdIsEmpty.validate(model.id!);
  }
}

export class PlayerDeleteValidator implements Validator<PlayerInput> {
  private validatePlayerIdIsEmpty = new ValidatePlayerIdIsEmpty();
  validate(model: PlayerInput): void {
    this.validatePlayerIdIsEmpty.validate(model.id!);
  }
}

class ValidateSquadIdIsEmpty {
  validate(squad_id: number) {
    if (!squad_id) {
      throw new SquadIdIsEmptyError();
    }
  }
}
class ValidatePlayerNameIsEmpty {
  validate(name: string) {
    if (!name || typeof name !== "string" || !name.trim()) {
      throw new PlayerNameIsEmptyError();
    }
  }
}
class ValidatePlayerIdIsEmpty {
  validate(id: number) {
    if (!id) throw new PlayerIdIsEmptyError();
  }
}
