export class PlayerModel {
  private id: number;
  private name: string;
  private squad_id: number;
  private bermuda_kills: number[];
  private purgatorio_kills: number[];
  private kalahari_kills: number[];
  private kills: number;

  constructor(
    id: number,
    name: string,
    squad_id: number,
    bermuda_kills: number[],
    purgatorio_kills: number[],
    kalahari_kills: number[],
    kills: number
  ) {
    this.id = id;
    this.name = name;
    this.squad_id = squad_id;
    this.bermuda_kills = bermuda_kills;
    this.purgatorio_kills = purgatorio_kills;
    this.kalahari_kills = kalahari_kills;
    this.kills = kills;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getSquadId() {
    return this.squad_id;
  }
  getBermudaKills() {
    return this.bermuda_kills;
  }
  getPurgatorioKills() {
    return this.purgatorio_kills;
  }
  getKalahariKills() {
    return this.kalahari_kills;
  }
  getKills() {
    return this.kills;
  }

  setName(name: string) {
    this.name = name;
  }
  setSquadId(squad_id: number) {
    this.squad_id = squad_id;
  }
  setBermudaKills(kills: number) {
    this.bermuda_kills.push(kills);
  }
  setPurgatorioKills(kills: number) {
    this.purgatorio_kills.push(kills);
  }
  setKalahariKills(kills: number) {
    this.kalahari_kills.push(kills);
  }
  setKills(kills: number) {
    this.kills += kills;
  }

  static fromUpdateInput(
    id: number,
    name: string,
    squadId: number,
    bermudaKills: number[],
    purgatorioKills: number[],
    kalahariKills: number[],
    totalKills: number
  ): PlayerModel {
    return new PlayerModel(
      id,
      name,
      squadId,
      bermudaKills,
      purgatorioKills,
      kalahariKills,
      totalKills
    );
  }
}
