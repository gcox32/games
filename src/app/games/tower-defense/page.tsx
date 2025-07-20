'use client';

import { useState } from "react";
import GameCanvas from "@/components/games/tower-defense/GameCanvas";
import GameUI from "@/components/games/tower-defense/GameUI";
import { ViridianForestRoute } from "@/components/games/tower-defense/maps/routes/ViridianForest";

export default function TowerDefensePage() {
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
    <main className="flex min-h-screen items-center justify-center gap-4 bg-neutral-100">
      <GameCanvas
        height={800}
        width={800}
        className={'rounded shadow-lg'}
        route={ViridianForestRoute}
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
        route={ViridianForestRoute.name}
      />
    </main>
  );
}