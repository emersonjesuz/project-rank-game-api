import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middleware/errorMiddleware";
import router from "./routers";

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.use(errorMiddleware);

export default server;
