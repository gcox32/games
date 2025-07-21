import { EnemyExtensions } from "../enemies/extensions";

export type PathPoint = { x: number; y: number };

export type RoutePath = {
  points: PathPoint[];
};

export type WaveInstruction = {
  delay: number;
  enemy: keyof typeof EnemyExtensions;
};

export type RouteWave = WaveInstruction[];

export type Route = {
  name: string;
  backgroundColor: string;
  pathColor: string;
  pageBackground: string;
  path: RoutePath;
  waves: RouteWave[];
};
