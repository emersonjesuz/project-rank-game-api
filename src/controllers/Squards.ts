import { Request, Response } from "express";
import Database from "../database/prisma";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../helpers/apiErros";
import { countBooyar, somePoints } from "../utils";
import { squardType } from "../types";

export default class Squards {
  async create(req: Request, res: Response) {
    const { name }: { name: string } = req.body;

    const getSquard = await new Database().getSquard(undefined, name);

    if (getSquard) throw new BadRequestError("equipe ja existe!");

    const createSquard = await new Database().createSquard(name);

    if (!createSquard)
      throw new ServerError("opss estamos com problemas internos !");

    return res.status(201).json({ ...createSquard, players: [] });
  }

  async edit(req: Request, res: Response) {
    const { name, bermuda_position, kalahari_position, purgatorio_position } =
      req.body;
    const { id } = req.params;

    const getSquard = await new Database().getSquard(+id);

    if (!getSquard) throw new NotFoundError("equipe não encontrada!");

    const positions = [
      +bermuda_position,
      +kalahari_position,
      +purgatorio_position,
    ];

    const countPoints = somePoints(positions);

    if (!countPoints && countPoints !== 0)
      throw new ServerError("opss estamos com problemas internos !");

    const newBooyar = countBooyar(positions, getSquard.booyar);

    if (!newBooyar && newBooyar !== 0)
      throw new ServerError("opss estamos com problemas internos !");

    const squard = {
      id: +id,
      name,
      booyar: newBooyar,
      points: getSquard.points + countPoints,
      bermuda_position: [...getSquard.bermuda_position, +bermuda_position],
      kalahari_position: [...getSquard.kalahari_position, +kalahari_position],
      purgatorio_position: [
        ...getSquard.purgatorio_position,
        +purgatorio_position,
      ],
    };

    const editSquard = await new Database().editSquard(squard);

    if (!editSquard)
      throw new ServerError("opss estamos com problemas internos !");

    res.status(201).json(editSquard);
  }

  async list(req: Request, res: Response) {
    const listSquards: squardType[] = await new Database().listSquards();

    if (!listSquards.length) return res.status(200).json([]);

    const players = await new Database().listPlayer();

    listSquards.forEach((squard) => {
      squard.players = players.filter(
        (player) => player.squard_id === squard.id
      );
    });

    listSquards.sort((a, b) => {
      return a.points < b.points ? 1 : a.points > b.points ? -1 : 0;
    });
    return res.status(200).json(listSquards);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("informe uma equipe !");
    }

    const getSquard = await new Database().getSquard(+id);

    if (!getSquard) {
      throw new NotFoundError("equipe não encontrada !");
    }

    const deleteSquard = await new Database().deleteSquard(+id);

    if (!deleteSquard) {
      throw new ServerError("não foi possivel excluir a equipe");
    }

    res.status(200).json(deleteSquard);
  }
}
