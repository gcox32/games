import type { EnemyExtension } from '../spawnEnemy';

const Ekans: EnemyExtension = {
  id: 'Ekans',
  health: 30,
  type: 'POISON',
  imageRef: '/sprites/ekans.png',
  speed: 150,
  width: 60,
  height: 60,
  color: 'lightblue',
  frameCount: 6,
  frameRate: 8,
};

export default Ekans;
