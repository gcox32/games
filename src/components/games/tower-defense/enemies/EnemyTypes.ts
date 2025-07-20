import type { EnemyDefinition } from './types';

export const EnemyTypes: Record<string, EnemyDefinition> = {
  basic: {
    type: 'basic',
    speed: 100,
    radius: 10,
    color: 'red',
    health: 10
  },
  fast: {
    type: 'fast',
    speed: 160,
    radius: 8,
    color: 'orange',
    health: 6
  },
  tank: {
    type: 'tank',
    speed: 60,
    radius: 12,
    color: 'purple',
    health: 25
  }
};
