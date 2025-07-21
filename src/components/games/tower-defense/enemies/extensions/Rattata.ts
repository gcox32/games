import type { EnemyExtension } from '../spawnEnemy';

const Rattata: EnemyExtension = {
  id: 'Rattata',
  health: 30,
  type: 'NORMAL',
  imageRef: '/sprites/rattata.png',
  speed: 100,
  width: 36,
  height: 36,
  color: 'gray',
  frameCount: 6,
  frameRate: 6,
};

export default Rattata;