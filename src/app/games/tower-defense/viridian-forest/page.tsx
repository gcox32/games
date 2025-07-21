'use client';

import TowerDefense from "@/components/games/tower-defense/TowerDefense";
import { ViridianForestRoute } from "@/components/games/tower-defense/maps/routes/ViridianForest";

export default function ViridianForest() {
  return <TowerDefense route={ViridianForestRoute} />;
}