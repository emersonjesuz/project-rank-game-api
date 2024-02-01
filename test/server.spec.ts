import server from "../server";
import request from "supertest";

describe("testing  create squard", () => {
  const name = "mata gato" + Math.random();

  it("create squard ", async () => {
    const response = await request(server).post("/create").send({ name });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("existe squard ", async () => {
    const response = await request(server).post("/create").send({ name });

    expect(response.body).toHaveProperty("message", "equipe ja existe!");
    expect(response.status).toBe(400);
  });

  it("not create squard ", async () => {
    const response = await request(server).post("/create").send({ name: "" });

    expect(response.body).toHaveProperty(
      "message",
      "informe o nome da equipe !"
    );
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
    const response = await request(server).put("/edit/27").send(data);

    expect(response.body).toHaveProperty("id", 27);
    expect(response.status).toBe(201);
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
    const response = await request(server).put("/edit/100").send(data);

    expect(response.body).toHaveProperty("message", "equipe não encontrada!");
    expect(response.status).toBe(404);
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
    const response = await request(server).put("/edit/27").send(data);

    expect(response.body).toHaveProperty(
      "message",
      "posição da equipe invalido !"
    );
    expect(response.status).toBe(400);
  });
});

describe("testing list squads", () => {
  it("list squards", async () => {
    const response = await request(server).get("/list");

    expect(response.status).toBe(200);
  });
});

describe("testing delete squads", () => {
  it("delete squard", async () => {
    const response = await request(server).delete("/delete/33");

    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(200);
  });

  it("can't find a team", async () => {
    const response = await request(server).delete("/delete/29");

    expect(response.body).toHaveProperty("message", "equipe não encontrada !");
    expect(response.status).toBe(404);
  });
});

describe("testing create player", () => {
  const name = "mata gato" + Math.random();
  it("create player", async () => {
    const response = await request(server)
      .post("/player/create")
      .send({ name, squard_id: 27 });

    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  it("player already exist", async () => {
    const response = await request(server)
      .post("/player/create")
      .send({ name, squard_id: 27 });

    expect(response.body).toHaveProperty("message", "jogador ja existe!");
    expect(response.status).toBe(400);
  });

  it("not found squard ", async () => {
    const response = await request(server)
      .post("/player/create")
      .send({ name: "pedrinho", squard_id: 2 });

    expect(response.body).toHaveProperty("message", "equipe não encontrada!");
    expect(response.status).toBe(404);
  });

  it("empty player name", async () => {
    const response = await request(server)
      .post("/player/create")
      .send({ name: " ", squard_id: 27 });

    expect(response.body).toHaveProperty(
      "message",
      "informe o nome do jogador corretamente !"
    );
    expect(response.status).toBe(400);
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
    const response = await request(server).put("/player/edit/1").send(player);

    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  it("not found player", async () => {
    const player = {
      name: "maria",
      bermuda_kills: 1,
      kalahari_kills: 1,
      purgatorio_kills: 1,
    };
    const response = await request(server).put("/player/edit/100").send(player);

    expect(response.body).toHaveProperty("message", "jogador não encontrado !");
    expect(response.status).toBe(404);
  });

  it("kills invalid", async () => {
    const player = {
      name: "paulo",
      bermuda_kills: -1,
      kalahari_kills: 1,
      purgatorio_kills: 1,
    };
    const response = await request(server).put("/player/edit/100").send(player);

    expect(response.body).toHaveProperty(
      "message",
      "A quantidade de  abates do jogador esta invalida!"
    );
    expect(response.status).toBe(400);
  });
});

describe("testing list players", () => {
  it("list players", async () => {
    const response = await request(server).get("/player/list");

    expect(response.status).toBe(200);
  });
});

describe("testing delete players", () => {
  it("delete players", async () => {
    const response = await request(server).delete("/player/delete/16");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("not found players", async () => {
    const response = await request(server).delete("/player/delete/15");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "jogador não encontrado");
  });
});
