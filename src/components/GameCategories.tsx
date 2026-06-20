import Link from "next/link";

const GAMES = [
  { name: "Pokémon", slug: "pokemon", emoji: "⚡", color: "bg-yellow-400", text: "text-yellow-900", count: "12,340" },
  { name: "Yu-Gi-Oh!", slug: "yugioh", emoji: "🃏", color: "bg-red-900", text: "text-white", count: "18,200" },
  { name: "One Piece", slug: "one-piece", emoji: "🏴‍☠️", color: "bg-red-600", text: "text-white", count: "5,800" },
  { name: "Digimon", slug: "digimon", emoji: "🦎", color: "bg-blue-600", text: "text-white", count: "4,100" },
  { name: "Weiss Schwarz", slug: "weiss-schwarz", emoji: "💎", color: "bg-pink-500", text: "text-white", count: "9,400" },
  { name: "Vanguard", slug: "vanguard", emoji: "⚔️", color: "bg-purple-700", text: "text-white", count: "7,800" },
  { name: "Duel Masters", slug: "duel-masters", emoji: "🔥", color: "bg-blue-800", text: "text-white", count: "3,200" },
  { name: "Battle Spirits", slug: "battle-spirits", emoji: "💥", color: "bg-orange-500", text: "text-white", count: "2,100" },
  { name: "Disney Lorcana", slug: "lorcana", emoji: "✨", color: "bg-indigo-800", text: "text-white", count: "1,900" },
  { name: "Gundam Card Game", slug: "gundam", emoji: "🤖", color: "bg-gray-700", text: "text-white", count: "1,500" },
  { name: "WIXOSS", slug: "wixoss", emoji: "🌸", color: "bg-pink-700", text: "text-white", count: "2,800" },
  { name: "Build Divide", slug: "build-divide", emoji: "🏗️", color: "bg-emerald-700", text: "text-white", count: "1,200" },
];

export default function GameCategories() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-gray-900 text-lg">Kategori Game</h2>
        <Link href="/search" className="text-sm text-red-600 hover:underline font-medium">Semua game →</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {GAMES.map((g) => (
          <Link
            key={g.slug}
            href={`/search/${g.slug}`}
            className={`${g.color} ${g.text} rounded-xl p-4 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-sm text-center`}
          >
            <span className="text-3xl">{g.emoji}</span>
            <span className="font-bold text-sm leading-tight">{g.name}</span>
            <span className="text-xs opacity-80">{g.count} kartu</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
