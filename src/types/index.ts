export type squardType = {
  id: number;
  name: string;
  booyar: number;
  points: number;
  kills: number;
  bermuda_position: number[];
  purgatorio_position: number[];
  kalahari_position: number[];
  players?: playerType[];
};

export type playerType = {
  id: number;
  name: string;
  kills?: number;
  bermuda_kills: number[];
  kalahari_kills: number[];
  purgatorio_kills: number[];
  squard_id?: number;
};
