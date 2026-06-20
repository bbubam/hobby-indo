import Link from "next/link";
import { Tag, TrendingUp } from "lucide-react";

const CARDS = [
  { name: "Charizard ex (Special Illustration Rare)", game: "Pokémon", set: "Obsidian Flames", price: 850000, buyback: 650000, slug: "charizard-ex-sir-obf", rarity: "SIR", hot: true },
  { name: "Blue-Eyes White Dragon (Quarter Century)", game: "Yu-Gi-Oh!", set: "QCSE", price: 1200000, buyback: 950000, slug: "bewd-qcse", rarity: "QSR", hot: true },
  { name: "Monkey D. Luffy (Leader)", game: "One Piece", set: "OP-01 Romance Dawn", price: 420000, buyback: 320000, slug: "luffy-leader-op01", rarity: "SEC", hot: false },
  { name: "Mewtwo VSTAR (Rainbow Rare)", game: "Pokémon", set: "Pokemon GO", price: 380000, buyback: 290000, slug: "mewtwo-vstar-rr-pgo", rarity: "RRR", hot: false },
  { name: "Boa Hancock", game: "One Piece", set: "OP-02 Paramount War", price: 250000, buyback: 190000, slug: "boa-hancock-op02", rarity: "SEC", hot: false },
  { name: "Omegamon (Alternate Art)", game: "Digimon", set: "BT-05", price: 175000, buyback: 130000, slug: "omegamon-aa-bt05", rarity: "SEC", hot: false },
  { name: "Hatsune Miku SP", game: "Weiss Schwarz", set: "Hatsune Miku", price: 95000, buyback: 70000, slug: "miku-sp", rarity: "SP", hot: false },
  { name: "Chronojet Dragon G (G-BT11)", game: "Vanguard", set: "G-BT11", price: 85000, buyback: 60000, slug: "chronojet-dragon-g-gbt11", rarity: "GR", hot: false },
];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function FeaturedCards() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-gray-900 text-lg flex items-center gap-2">
          <TrendingUp size={18} className="text-red-600" /> Kartu Populer
        </h2>
        <Link href="/kartu" className="text-sm text-red-600 hover:underline font-medium">Semua kartu →</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {CARDS.map((card) => (
          <Link
            key={card.slug}
            href={`/kartu/${card.slug}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            {/* Card image placeholder */}
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 aspect-[3/4] flex items-center justify-center relative">
              <span className="text-4xl opacity-30">🃏</span>
              {card.hot && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  HOT
                </span>
              )}
              <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                {card.rarity}
              </span>
            </div>
            <div className="p-3">
              <div className="text-xs text-gray-500 mb-1">{card.game} · {card.set}</div>
              <div className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                {card.name}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-red-600 font-bold text-sm">
                  <Tag size={12} /> {formatRupiah(card.price)}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  Buyback: {formatRupiah(card.buyback)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
