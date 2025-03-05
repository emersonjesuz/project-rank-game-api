import { PlayerModel } from "./Player.model";

export class SquadModel {
  private id: number;
  private name: string;
  private booyar: number;
  private points: number;
  private kills: number;
  private bermuda_position: number[];
  private purgatorio_position: number[];
  private kalahari_position: number[];
  private players: PlayerModel[];

  constructor(
    id: number,
    name: string,
    booyar: number,
    points: number,
    kills: number,
    bermuda_position: number[],
    purgatorio_position: number[],
    kalahari_position: number[],
    players: PlayerModel[]
  ) {
    this.id = id;
    this.name = name;
    this.booyar = booyar;
    this.points = points;
    this.kills = kills;
    this.bermuda_position = bermuda_position;
    this.purgatorio_position = purgatorio_position;
    this.kalahari_position = kalahari_position;
    this.players = players;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getBooyar() {
    return this.booyar;
  }
  getPoints() {
    return this.points;
  }
  getKills() {
    return this.kills;
  }
  getBermudaPosition() {
    return this.bermuda_position;
  }
  getPurgatorioPosition() {
    return this.purgatorio_position;
  }
  getKalahariPosition() {
    return this.kalahari_position;
  }
  getPlayers() {
    return this.players;
  }

  setName(name: string) {
    this.name = name;
  }
  setBooyar(booyar: number) {
    this.booyar += booyar;
  }
  setPoints(points: number) {
    this.points += points;
  }
  setKills(kills: number) {
    this.kills += kills;
  }
  setBermudaPosition(position: number) {
    this.bermuda_position.push(position);
  }
  setPurgatorioPosition(position: number) {
    this.purgatorio_position.push(position);
  }
  setKalahariPosition(position: number) {
    this.kalahari_position.push(position);
  }
  setPlayers(players: PlayerModel[]) {
    this.players = players;
  }
}
