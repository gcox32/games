import type { TowerConfig } from '../types';

export const TowerTypes: Record<string, TowerConfig> = {
  Shooter: {
    id: 'Shooter',
    archetype: 'shooter',
    range: 100,
    damage: 5,
    fireRate: 1,
    radius: 12,
    color: 'skyblue'
  },
  Sniper: {
    id: 'Sniper',
    archetype: 'sniper',
    range: 180,
    damage: 15,
    fireRate: 0.5,
    radius: 10,
    color: 'slategray'
  },
  Splash: {
    id: 'Splash',
    archetype: 'splash',
    range: 90,
    damage: 3,
    fireRate: 1.5,
    radius: 14,
    color: 'limegreen'
  }
};
