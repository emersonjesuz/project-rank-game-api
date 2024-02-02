"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
describe("testing  create squard", () => {
    const name = "mata gato" + Math.random();
    it("create squard ", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/create").send({ name });
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
    });
    it("existe squard ", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/create").send({ name });
        (0, globals_1.expect)(response.body).toHaveProperty("message", "equipe ja existe!");
        (0, globals_1.expect)(response.status).toBe(400);
    });
    it("not create squard ", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/create").send({ name: "" });
        (0, globals_1.expect)(response.body).toHaveProperty("message", "informe o nome da equipe !");
    });
});
describe("testing edite squard", () => {
    it("edite squard", async () => {
        const data = {
            name: "mata jegue 2",
            booyar: 1,
            points: 25,
            kills: 2,
            bermuda_position: 1,
            purgatorio_position: 12,
            kalahari_position: 6,
        };
        const response = await (0, supertest_1.default)(server_1.default).put("/edit/27").send(data);
        (0, globals_1.expect)(response.body).toHaveProperty("id", 27);
        (0, globals_1.expect)(response.status).toBe(201);
    });
    it("not  edite squard", async () => {
        const data = {
            name: "mata jegue",
            booyar: 1,
            points: 25,
            kills: 2,
            bermuda_position: 1,
            purgatorio_position: 12,
            kalahari_position: 6,
        };
        const response = await (0, supertest_1.default)(server_1.default).put("/edit/100").send(data);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "equipe não encontrada!");
        (0, globals_1.expect)(response.status).toBe(404);
    });
    it("position exceeded", async () => {
        const data = {
            name: "mata jegue",
            booyar: 1,
            points: 25,
            kills: 2,
            bermuda_position: -1,
            purgatorio_position: 13,
            kalahari_position: 3,
        };
        const response = await (0, supertest_1.default)(server_1.default).put("/edit/27").send(data);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "posição da equipe invalido !");
        (0, globals_1.expect)(response.status).toBe(400);
    });
});
describe("testing list squads", () => {
    it("list squards", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/list");
        (0, globals_1.expect)(response.status).toBe(200);
    });
});
describe("testing delete squads", () => {
    it("delete squard", async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete("/delete/33");
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.status).toBe(200);
    });
    it("can't find a team", async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete("/delete/29");
        (0, globals_1.expect)(response.body).toHaveProperty("message", "equipe não encontrada !");
        (0, globals_1.expect)(response.status).toBe(404);
    });
});
describe("testing create player", () => {
    const name = "mata gato" + Math.random();
    it("create player", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/player/create")
            .send({ name, squard_id: 27 });
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.status).toBe(201);
    });
    it("player already exist", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/player/create")
            .send({ name, squard_id: 27 });
        (0, globals_1.expect)(response.body).toHaveProperty("message", "jogador ja existe!");
        (0, globals_1.expect)(response.status).toBe(400);
    });
    it("not found squard ", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/player/create")
            .send({ name: "pedrinho", squard_id: 2 });
        (0, globals_1.expect)(response.body).toHaveProperty("message", "equipe não encontrada!");
        (0, globals_1.expect)(response.status).toBe(404);
    });
    it("empty player name", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/player/create")
            .send({ name: " ", squard_id: 27 });
        (0, globals_1.expect)(response.body).toHaveProperty("message", "informe o nome do jogador corretamente !");
        (0, globals_1.expect)(response.status).toBe(400);
    });
});
describe("testing edit player", () => {
    it("edit player", async () => {
        const player = {
            name: "maria",
            bermuda_kills: 1,
            kalahari_kills: 1,
            purgatorio_kills: 1,
        };
        const response = await (0, supertest_1.default)(server_1.default).put("/player/edit/1").send(player);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
        (0, globals_1.expect)(response.status).toBe(201);
    });
    it("not found player", async () => {
        const player = {
            name: "maria",
            bermuda_kills: 1,
            kalahari_kills: 1,
            purgatorio_kills: 1,
        };
        const response = await (0, supertest_1.default)(server_1.default).put("/player/edit/100").send(player);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "jogador não encontrado !");
        (0, globals_1.expect)(response.status).toBe(404);
    });
    it("kills invalid", async () => {
        const player = {
            name: "paulo",
            bermuda_kills: -1,
            kalahari_kills: 1,
            purgatorio_kills: 1,
        };
        const response = await (0, supertest_1.default)(server_1.default).put("/player/edit/100").send(player);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "A quantidade de  abates do jogador esta invalida!");
        (0, globals_1.expect)(response.status).toBe(400);
    });
});
describe("testing list players", () => {
    it("list players", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/player/list");
        (0, globals_1.expect)(response.status).toBe(200);
    });
});
describe("testing delete players", () => {
    it("delete players", async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete("/player/delete/16");
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toHaveProperty("id");
    });
    it("not found players", async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete("/player/delete/15");
        (0, globals_1.expect)(response.status).toBe(404);
        (0, globals_1.expect)(response.body).toHaveProperty("message", "jogador não encontrado");
    });
});
