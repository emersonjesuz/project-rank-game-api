import { Router } from "express";
import { PlayerFactoryService } from "../factory/Player.factory";

export const playerRoutes = Router();

playerRoutes.post("/create", async (req, res) => {
  const { name, squad_id } = req.body;
  const playerFactoryService = new PlayerFactoryService();
  await playerFactoryService.create({ name, squad_id });
  res.status(201).json({ message: "Jogador criado com sucesso" });
});
playerRoutes.put("/update/:id", async (req, res) => {
  const { name, bermuda_kills, kalahari_kills, purgatorio_kills } = req.body;
  const { id } = req.params;
  const playerFactoryService = new PlayerFactoryService();
  await playerFactoryService.update({
    id: +id,
    name,
    bermuda_kills,
    kalahari_kills,
    purgatorio_kills,
  });
  res.status(200).json({ message: "Jogador atualizado com sucesso" });
});
playerRoutes.get("/list", async (req, res) => {
  const playerFactoryService = new PlayerFactoryService();
  const players = playerFactoryService.list();
  res.status(200).json(players);
});
playerRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const playerFactoryService = new PlayerFactoryService();
  await playerFactoryService.delete(+id);
  res.status(200).send();
});
