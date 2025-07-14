import GameCard from "./GameCard";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

interface GameGridProps {
  games: Game[];
  searchQuery: string;
}

export default function GameGrid({ games, searchQuery }: GameGridProps) {
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No games found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              href={game.href}
            />
          ))}
        </div>
      )}
    </div>
  );
} 