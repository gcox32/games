export type TowerArchetype = 'shooter' | 'sniper' | 'splash';

export type TowerConfig = {
  id: string;
  archetype: TowerArchetype;
  range: number;
  damage: number;
  fireRate: number; // shots per second
  radius: number;
  color: string;
};
