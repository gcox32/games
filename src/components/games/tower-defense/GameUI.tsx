'use client';

import { TowerTypes } from './towers/extensions';
import { TowerConfig } from './towers/types';

type Props = {
  gameState: 'idle' | 'running' | 'paused';
  currentWave: number;
  selectedTowerId: string;
  onToggleGame: () => void;
  onSelectTower: (towerId: string) => void;
  route: string;
};

export default function GameUI({
  gameState,
  currentWave,
  selectedTowerId,
  onToggleGame,
  onSelectTower,
  route
}: Props) {
  return (
    <div className="flex flex-col justify-between items-center gap-4 bg-white dark:bg-gray-900 shadow-lg p-4 border-2 border-gray-300 rounded-lg w-[240px] h-[800px] text-center">

      <div className="flex flex-col gap-2">
        <div className="text-gray-700 dark:text-white text-sm">
          {route}
        </div>
        <div className="text-gray-700 dark:text-white text-sm">
          Wave: {currentWave + 1}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mx-auto">
        {Object.values(TowerTypes).map((tower: TowerConfig) => (
          <button
            key={tower.id}
            className={`transition-all hover:outline-2 hover:outline-blue-500 duration-100 py-1 rounded border text-xs cursor-pointer w-[60px] h-[60px] ${selectedTowerId === tower.id
              ? 'bg-blue-500 text-white border-blue-600'
              : 'bg-white text-black border-gray-300'
              }`}
            onClick={() => onSelectTower(selectedTowerId === tower.id ? '' : tower.id)}
            style={{ 
              backgroundImage: `url(${tower.icon})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

        ))}
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full text-white transition cursor-pointer"
        onClick={onToggleGame}
      >
        {gameState === 'running' ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}
