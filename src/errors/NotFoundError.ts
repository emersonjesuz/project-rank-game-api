import { CustomError } from "./CustomErrors";

export class SquadNotFoundError extends CustomError {
  constructor() {
    super("Equipe não registrada", 404);
  }
}

export class PlayerNotFoundError extends CustomError {
  constructor() {
    super("Jogador não registrado", 404);
  }
}
