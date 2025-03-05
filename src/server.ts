import cors from "cors";
import express from "express";
import "express-async-errors";
import { playerRoutes } from "./controllers/Players";
import { squadRoutes } from "./controllers/Squads";
import { errorMiddleware } from "./middleware/errorMiddleware";

const server = express();
server.use(cors());
server.use(express.json());
server.use("/api/v2/player", playerRoutes);
server.use("/api/v2/squad", squadRoutes);
server.use(errorMiddleware);

export default server;
