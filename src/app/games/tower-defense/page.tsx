import GameCanvas from "@/components/games/tower-defense/GameCanvas";

export default function TowerDefensePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100">
      <GameCanvas height={600} width={800} className={'rounded shadow-lg'} />
    </main>
  );
}