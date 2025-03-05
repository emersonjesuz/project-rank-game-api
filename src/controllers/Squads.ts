import { Router } from "express";
import { SquadFactoryService } from "../factory/Squad.factory";

export const squadRoutes = Router();

squadRoutes.post("/create", async (req, res) => {
  const { name } = req.body;
  const squadFactoryService = new SquadFactoryService();
  await squadFactoryService.create(name);
  res.status(201).json({ message: "Equipe registrada com sucesso" });
});

squadRoutes.put("/update/:id", async (req, res) => {
  const { name, bermuda_position, kalahari_position, purgatorio_position } =
    req.body;
  const { id } = req.params;
  const squadFactoryService = new SquadFactoryService();
  await squadFactoryService.update({
    name,
    bermuda_position,
    kalahari_position,
    purgatorio_position,
    id: +id,
  });
  res.status(200).json({ message: "Equipe atualizada com sucesso" });
});
squadRoutes.get("/list", async (req, res) => {
  const squadFactoryService = new SquadFactoryService();
  const squad = await squadFactoryService.list();
  res.status(200).json(squad);
});
