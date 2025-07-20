// enemies/spawnEnemy.ts

import { EnemyInstanceConfig, Archetype, EnemyType } from './types';
import { EnemyArchetypes } from './Archetypes';
import { Enemy } from './Enemy';
import type { PathPoint } from '../maps/types';

export type EnemyExtension = {
  id: string;
  archetype: Archetype;
  health: number;
  type: EnemyType;
  typeTwo?: EnemyType;
  imageRef?: string;
};

export function spawnEnemy(extension: EnemyExtension, path: PathPoint[]): Enemy {
  const archetype = EnemyArchetypes[extension.archetype];
  if (!archetype) throw new Error(`Unknown archetype: ${extension.archetype}`);

  const config: EnemyInstanceConfig = {
    ...archetype,
    archetype: extension.archetype,
    id: extension.id,
    health: extension.health,
    type: extension.type,
    typeTwo: extension.typeTwo,
    imageRef: extension.imageRef
  };

  return new Enemy(config, path);
}