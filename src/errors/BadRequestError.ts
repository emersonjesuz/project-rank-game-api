import { CustomError } from "./CustomErrors";

export class KillsIsNotNumberError extends CustomError {
  constructor() {
    super("Os abates Precisam ser numeros", 400);
  }
}
export class KillsIsNotPositiveError extends CustomError {
  constructor() {
    super("Os abates não podem ser menor que zero", 400);
  }
}
export class SquadIdIsEmptyError extends CustomError {
  constructor() {
    super("Id da equipe nao pode ser vazio", 400);
  }
}
export class SquadNameIsEmptyError extends CustomError {
  constructor() {
    super("O nome da equipe nao pode ser vazio", 400);
  }
}
export class PlayerIdIsEmptyError extends CustomError {
  constructor() {
    super("Id do jogador nao pode ser vazio", 400);
  }
}
export class PlayerNameIsEmptyError extends CustomError {
  constructor() {
    super("Nome do jogador não pode ser vazio", 400);
  }
}
export class PlayerNameIsNotUniqueError extends CustomError {
  constructor() {
    super("Nome escolhido ja esta em uso", 400);
  }
}
export class SquadNameIsNotUniqueError extends CustomError {
  constructor() {
    super("Nome escolhido ja esta em uso", 400);
  }
}
export class MaxPlayersInSquadError extends CustomError {
  constructor() {
    super("Equipe ja possui 5 jogadores", 400);
  }
}
export class PlayerAlreadyRegisteredError extends CustomError {
  constructor() {
    super("Jogador ja registrado", 400);
  }
}
