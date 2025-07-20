export type EnemyType = 'WATER' | 'FIRE' | 'GRASS' | 'ELECTRIC' | 'PSYCHIC' | 'DRAGON' | 'DARK' | 'FAIRY' | 'STEEL' | 'ICE' | 'FIGHTING' | 'POISON' | 'GROUND' | 'FLYING' | 'BUG' | 'ROCK' | 'GHOST' | 'NORMAL';

export type Archetype = 'basic' | 'fast' | 'tank';


export type EnemyArchetype = {
  archetype: Archetype;
  speed: number;
  radius: number;
  color: string;
};

export type EnemyInstanceConfig = EnemyArchetype & {
  id: string;
  health: number;
  type: EnemyType;
  typeTwo?: EnemyType;
  imageRef?: string;
};

