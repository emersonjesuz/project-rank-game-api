import { Request, Response } from "express";
import Database from "../database/prisma";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../helpers/apiErros";

export default class Player {
  async create(req: Request, res: Response) {
    const { name, squard_id } = req.body;

    const getSquard = await new Database().getSquard(squard_id);

    if (!getSquard) {
      throw new NotFoundError("equipe não encontrada!");
    }

    const getPlayer = await new Database().getPlayer(undefined, name);

    if (getPlayer) {
      throw new BadRequestError("jogador ja existe!");
    }

    const listPlayerInSquard = await new Database().listPlayer(squard_id);

    if (listPlayerInSquard.length >= 5) {
      throw new BadRequestError("equipe ja estar completa !");
    }

    const createPlayer = await new Database().createPlayer(name, squard_id);

    if (!createPlayer) {
      throw new ServerError("não foi possivel criar o jogador !");
    }

    return res.status(201).json(createPlayer);
  }
}
