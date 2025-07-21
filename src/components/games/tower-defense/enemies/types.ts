export type EnemyType =
  | 'WATER'
  | 'FIRE'
  | 'GRASS'
  | 'ELECTRIC'
  | 'PSYCHIC'
  | 'DRAGON'
  | 'DARK'
  | 'FAIRY'
  | 'STEEL'
  | 'ICE'
  | 'FIGHTING'
  | 'POISON'
  | 'GROUND'
  | 'FLYING'
  | 'BUG'
  | 'ROCK'
  | 'GHOST'
  | 'NORMAL';

export type EnemyInstanceConfig = {
  id: string;
  health: number;
  type: EnemyType;
  typeTwo?: EnemyType;
  imageRef?: string;
  speed: number;
  width: number;
  height: number;
  color: string;
  frameCount: number;
  frameRate: number;
};

