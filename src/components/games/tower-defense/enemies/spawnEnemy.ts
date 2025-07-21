import { EnemyInstanceConfig } from './types';
import { Enemy } from './Enemy';
import type { PathPoint } from '../maps/types';

export type EnemyExtension = EnemyInstanceConfig;

export function spawnEnemy(extension: EnemyExtension, path: PathPoint[]): Enemy {
  return new Enemy(extension, path);
}