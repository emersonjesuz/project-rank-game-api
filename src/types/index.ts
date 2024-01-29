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
  squard?: string;
  position?: number;
  bermuda?: number;
  kalahari?: number;
  purgatorio?: number;
  active?: boolean;
  squard_id: number;
};
