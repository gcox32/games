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
    <div className="flex flex-col items-center gap-4 text-center h-[800px] w-[200px] p-4 border-2 border-gray-300 rounded-lg justify-between">

      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-700">
          {route}
        </div>
        <div className="text-sm text-gray-700">
          Wave: {currentWave + 1}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap mx-auto">
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
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full cursor-pointer"
        onClick={onToggleGame}
      >
        {gameState === 'running' ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}
