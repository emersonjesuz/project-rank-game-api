import { Response, Request, NextFunction } from "express";
import { BadRequestError } from "../../helpers/apiErros";
export default class SquardMiddlerware {
  create(req: Request, res: Response, next: NextFunction) {
    const { name }: { name: string } = req.body;

    if (!name || !name.trim())
      throw new BadRequestError("informe o nome da equipe !");

    next();
  }

  edit(req: Request, res: Response, next: NextFunction) {
    const { name, bermuda_position, kalahari_position, purgatorio_position } =
      req.body;

    if (!name || !name.trim())
      throw new BadRequestError("informe o nome da equipe !");

    const bermuda = bermuda_position >= 0 && bermuda_position <= 12;
    const kalahari = kalahari_position >= 0 && kalahari_position <= 12;
    const purgatorio = purgatorio_position >= 0 && purgatorio_position <= 12;

    if (!bermuda || !kalahari || !purgatorio)
      throw new BadRequestError("posição da equipe invalido !");

    next();
  }
}
