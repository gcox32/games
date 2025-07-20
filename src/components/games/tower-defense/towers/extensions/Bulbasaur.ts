import type { TowerConfig } from '../types';

const Bulbasaur: TowerConfig = {
  id: 'Bulbasaur',
  archetype: 'splash',
  range: 100, // 100px range
  damage: 5, // 5 damage per shot
  fireRate: 1, // 1 shot per second
  radius: 12, // 12px radius
  color: 'lightgreen',
  icon: '/icons/bulbasaur-icon.png'
};

export default Bulbasaur; 