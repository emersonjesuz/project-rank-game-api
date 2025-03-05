export interface PlayerInput {
  name?: string;
  squad_id?: number;
  id?: number;
  bermuda_kills?: number;
  kalahari_kills?: number;
  purgatorio_kills?: number;
}
export interface PlayerCreateInput {
  name: string;
  squad_id: number;
}

export interface PlayerUpdateInput {
  id: number;
  name: string;
  bermuda_kills: number;
  kalahari_kills: number;
  purgatorio_kills: number;
}
