import { Archetype, EnemyArchetype } from './types';

export const EnemyArchetypes: Record<Archetype, Omit<EnemyArchetype, 'archetype'>> = {
  basic: {
    speed: 100,
    radius: 25,
    color: 'gray'
  },
  fast: {
    speed: 150,
    radius: 20,
    color: 'lightblue'
  },
  tank: {
    speed: 60,
    radius: 30,
    color: 'darkgray'
  }
};
