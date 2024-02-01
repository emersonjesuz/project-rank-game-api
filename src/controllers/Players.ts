import { Request, Response } from "express";
import Database from "../database/prisma";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../helpers/apiErros";
import { playerType } from "../types";

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

  async edit(req: Request, res: Response) {
    const { name, bermuda_kills, kalahari_kills, purgatorio_kills } = req.body;
    const { id } = req.params;

    const kills: number = bermuda_kills + kalahari_kills + purgatorio_kills;

    const getPlayer = await new Database().getPlayer(+id);
    const verifyNamePlayer = await new Database().getPlayer(undefined, name);

    if (!getPlayer) {
      throw new NotFoundError("jogador não encontrado !");
    }

    if (verifyNamePlayer && verifyNamePlayer.id !== getPlayer.id) {
      throw new NotFoundError("jogador ja existe!");
    }

    const dataPlayer: playerType = {
      name,
      bermuda_kills: [...getPlayer.bermuda_kills, bermuda_kills],
      kalahari_kills: [...getPlayer.kalahari_kills, kalahari_kills],
      purgatorio_kills: [...getPlayer.purgatorio_kills, purgatorio_kills],
      kills: kills + getPlayer.kills,
      id: +id,
    };

    const editPlayer = await new Database().editPlayer(dataPlayer);

    if (!editPlayer)
      throw new ServerError("não foi possivel editar o jogador!");

    const getSquard = await new Database().getSquard(editPlayer.squard_id);

    if (!getSquard)
      throw new ServerError("tivemos problemas ao salvar os abates da equipe");

    await new Database().editSquard(undefined, {
      id: editPlayer.squard_id,
      kills: kills + getSquard.kills,
      points: kills + getSquard.points,
    });

    return res.status(201).json(editPlayer);
  }

  async list(req: Request, res: Response) {
    const listPlayers = await new Database().listPlayer();

    listPlayers.sort((a, b) =>
      a.kills < b.kills ? 1 : a.kills > b.kills ? -1 : 0
    );

    return res.status(200).json(listPlayers ?? []);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) throw new BadRequestError("informe um jogador !");

    const getPlayer = await new Database().getPlayer(+id);

    if (!getPlayer) throw new NotFoundError("jogador não encontrado");

    const deletePlayer = await new Database().deletePlayer(+id);

    if (!deletePlayer)
      throw new ServerError("não foi possivel excluir o jogador");

    return res.status(200).json(deletePlayer);
  }
}
