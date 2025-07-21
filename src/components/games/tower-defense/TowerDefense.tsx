'use client';

import { useState } from "react";
import GameCanvas from "@/components/games/tower-defense/GameCanvas";
import GameUI from "@/components/games/tower-defense/GameUI";
import { Route } from "./maps/types";

export default function TowerDefense({ route }: { route: Route }) {
  const [gameState, setGameState] = useState<'idle' | 'running' | 'paused'>('idle');
  const [currentWave, setCurrentWave] = useState(0);
  const [selectedTowerId, setSelectedTowerId] = useState('');

  const toggleGame = () => {
    setGameState((prev) => {
      if (prev === 'running') return 'paused';
      return 'running';
    });
  };
  return (
    <main className='flex justify-center items-center gap-4 bg-neutral-100 bg-cover bg-no-repeat bg-center min-h-screen' style={{ backgroundImage: `url('${route.pageBackground}')` }}>
      <GameCanvas
        height={800}
        width={800}
        className={'rounded-lg shadow-lg border-2 border-gray-300'}
        route={route}
        gameState={gameState}
        setCurrentWave={setCurrentWave}
        selectedTowerId={selectedTowerId}
        setSelectedTowerId={setSelectedTowerId}
      />
      <GameUI
        gameState={gameState}
        currentWave={currentWave}
        selectedTowerId={selectedTowerId}
        onToggleGame={toggleGame}
        onSelectTower={setSelectedTowerId}
        route={route.name}
      />
    </main>
  );
}