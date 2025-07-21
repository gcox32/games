import type { EnemyExtension } from '../spawnEnemy';

const Koffing: EnemyExtension = {
  id: 'Koffing',
  health: 30,
  type: 'POISON',
  imageRef: '/sprites/koffing.png',
  speed: 60,
  width: 64,
  height: 64,
  color: 'darkgray',
  frameCount: 6,
  frameRate: 8,
};

export default Koffing;