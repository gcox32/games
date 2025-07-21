"use client";

import Link from "next/link";
import { ViridianForestRoute } from "@/components/games/tower-defense/maps/routes/ViridianForest";

export default function TowerDefenseMapSelect() {
  return (
    <main className="flex flex-col justify-center items-center bg-gradient-to-br from-green-50 dark:from-gray-900 to-green-200 dark:to-gray-800 p-8 min-h-screen">
      <h1 className="mb-4 font-bold text-gray-900 dark:text-white text-3xl">Tower Defense</h1>
      <section className="mb-10 w-full max-w-md">
        <h2 className="mb-2 font-semibold text-xl">Select a Map</h2>
        <div className="flex flex-col gap-4">
          <Link 
            href="/games/tower-defense/viridian-forest" 
            className="block bg-white dark:bg-gray-900 shadow hover:shadow-lg p-4 border border-green-400 rounded-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-cover bg-center border border-gray-200 rounded w-16 h-16" style={{ backgroundImage: ViridianForestRoute.pageBackground }} />
              <div>
                <div className="font-bold text-lg">{ViridianForestRoute.name}</div>
                <div className="mb-4 text-gray-900 dark:text-white text-xs">Classic Kanto forest route</div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className="w-full max-w-md">
        <h2 className="mb-2 font-semibold text-xl">Your All-Time Stats</h2>
        <div className="bg-white dark:bg-gray-900 p-4 border border-gray-300 rounded-lg text-gray-500 dark:text-white text-center">
          <div className="mb-2">(Stats coming soon)</div>
          <ul className="space-y-1">
            <li>Total Games Played: --</li>
            <li>Best Wave: --</li>
            <li>Total Enemies Defeated: --</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
