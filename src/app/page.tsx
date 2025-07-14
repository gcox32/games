"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import SearchBar from "@/components/home/SearchBar";
import GameGrid from "@/components/home/GameGrid";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const games: Game[] = [
  {
    id: "tower-defense",
    title: "Tower Defense",
    description: "Defend your base by strategically placing towers",
    icon: <Shield className="w-8 h-8" />,
    href: "/games/tower-defense",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            JavaScript Games
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of interactive games built with modern web technologies
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Games Grid */}
        <GameGrid games={games} searchQuery={searchQuery} />

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>Built with Next.js and TypeScript</p>
        </footer>
      </div>
    </div>
  );
}
