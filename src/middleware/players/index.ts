import { NextFunction, Request, Response } from "express";
import { BadRequestError, InvalidFormatError } from "../../helpers/apiErros";

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

  edit(req: Request, res: Response, next: NextFunction) {
    const { name, bermuda_kills, kalahari_kills, purgatotrio_kills } = req.body;

    const { id } = req.params;

    if (!id) {
      throw new InvalidFormatError("informe o jogador !");
    }
    if (!name || !name.trim()) {
      throw new BadRequestError("informe o nome do jogador corretamente !");
    }

    if (bermuda_kills < 0 || purgatotrio_kills < 0 || kalahari_kills < 0) {
      throw new BadRequestError(
        "A quantidade de  abates do jogador esta invalida!"
      );
    }

    next();
  }
}
