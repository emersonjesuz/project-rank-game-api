import { Router } from "express";
import SquardMiddlerware from "../middleware/squards";
import Squards from "../controllers/Squards";
import PlayerMidlleware from "../middleware/players";
import Player from "../controllers/Players";

const router = Router();

router.post("/create", new SquardMiddlerware().create, new Squards().create);
router.put("/edit/:id", new SquardMiddlerware().edit, new Squards().edit);
router.get("/list", new Squards().list);
router.delete("/delete/:id", new Squards().delete);

router.post(
  "/player/create",
  new PlayerMidlleware().create,
  new Player().create
);

export default router;
