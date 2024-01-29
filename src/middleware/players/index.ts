import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../helpers/apiErros";

export default class PlayerMidlleware {
  create(req: Request, res: Response, next: NextFunction) {
    const { name, squard_id }: { name: string; squard_id: number } = req.body;

    if (!squard_id) {
      throw new BadRequestError("informe um jogador!");
    }
    if (!name || !name.trim()) {
      throw new BadRequestError("informe o nome do jogador corretamente !");
    }

    next();
  }
}
