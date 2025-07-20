import { Route } from '../types';

export const ViridianForestRoute: Route = {
  name: 'Viridian Forest',
  path: {
    points: [
      { x: 400, y: 800 },
      { x: 400, y: 750 },
      { x: 700, y: 750 },
      { x: 700, y: 150 },
      { x: 550, y: 150 },
      { x: 550, y: 400 },
      { x: 400, y: 400 },
      { x: 400, y: 50 },
      { x: 250, y: 50 },
      { x: 250, y: 500 },
      { x: 100, y: 500 },
      { x: 100, y: 0 }
    ]
  },
  waves: [
    [
      { delay: 0, enemy: 'Rattata' },
      { delay: 0.5, enemy: 'Rattata' },
      { delay: 1.5, enemy: 'Koffing' },
      { delay: 2.0, enemy: 'Rattata' },
      { delay: 2.5, enemy: 'Ekans' }
    ],
    [
      { delay: 0, enemy: 'Rattata' },
      { delay: 0.5, enemy: 'Rattata' },
      { delay: 1.5, enemy: 'Koffing' },
      { delay: 2.0, enemy: 'Rattata' },
      { delay: 2.5, enemy: 'Ekans' }
    ]
  ]
  
};
