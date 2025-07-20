import type { EnemyExtension } from '../spawnEnemy';

const Koffing: EnemyExtension = {
  id: 'Koffing',
  archetype: 'tank',
  health: 30,
  type: 'POISON',
  imageRef: '/images/enemies/koffing.svg'
};

export default Koffing;