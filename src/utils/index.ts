import { tablePoints } from "../helpers/tablePoints";

export function somePoints(positions: number[], kills: number): number {
  let points = 0;
  positions.forEach((position) => {
    Object.entries(tablePoints).forEach(([key, value]) => {
      if (position === +key) points += value;
    });
  });
  return points + kills;
}

export function countBooyar(positions: number[], booyars: number) {
  const some = booyars + positions.filter((position) => position === 1).length;
  return some;
}
