import { SquadInput } from "../dtos/inputs/Squad.inputs";
import { SquadNameIsEmptyError } from "../errors/BadRequestError";
import { Validator } from "./Validator";

export class SquadValidator implements Validator<SquadInput> {
  validate(model: SquadInput): void {
    this.squadNameIsEmpty(model.name!);
  }

  private squadNameIsEmpty(name: string) {
    if (!name || typeof name !== "string" || !name.trim()) {
      throw new SquadNameIsEmptyError();
    }
  }
}
