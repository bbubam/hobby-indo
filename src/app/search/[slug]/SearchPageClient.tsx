"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag, SlidersHorizontal } from "lucide-react";
import SetCarousel from "@/components/SetCarousel";

const MOCK_CARDS = [
  { name: "Kartu Langka A", rarity: "SR", price: 450000, buyback: 350000 },
  { name: "Kartu Langka B", rarity: "RR", price: 280000, buyback: 210000 },
  { name: "Kartu Uncommon C", rarity: "R", price: 95000, buyback: 70000 },
  { name: "Kartu Special D", rarity: "SEC", price: 1200000, buyback: 950000 },
  { name: "Kartu Rare E", rarity: "SR", price: 175000, buyback: 130000 },
  { name: "Kartu Normal F", rarity: "C", price: 15000, buyback: 8000 },
  { name: "Kartu Alt Art G", rarity: "SAR", price: 680000, buyback: 520000 },
  { name: "Kartu Holo H", rarity: "RRR", price: 320000, buyback: 240000 },
  { name: "Kartu Promo I", rarity: "PR", price: 55000, buyback: 38000 },
  { name: "Kartu Gold J", rarity: "GR", price: 890000, buyback: 700000 },
  { name: "Kartu Full Art K", rarity: "FA", price: 230000, buyback: 175000 },
  { name: "Kartu Quarter L", rarity: "QSR", price: 1500000, buyback: 1200000 },
];

const RARITIES = ["Semua", "SEC", "QSR", "SAR", "SR", "RRR", "RR", "R", "FA", "GR", "PR", "C"];
const SORTS = ["Harga: Tertinggi", "Harga: Terendah", "Nama A-Z", "Terbaru"];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

type Props = {
  slug: string;
  game: { name: string; emoji: string; description: string };
};

export default function SearchPageClient({ slug, game }: Props) {
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [activeRarity, setActiveRarity] = useState("Semua");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-red-600">Beranda</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{game.name}</span>
      </div>

      {/* Game header */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-4 flex items-center gap-4">
        <span className="text-5xl">{game.emoji}</span>
        <div>
          <h1 className="text-2xl font-black text-gray-900">{game.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{game.description}</p>
        </div>
      </div>

      {/* Set carousel */}
      <div className="bg-white rounded-xl shadow-sm px-4 pt-3 pb-2 mb-6">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Pilih Set / Edisi</div>
        <SetCarousel slug={slug} activeSet={activeSet} onSelect={setActiveSet} />
        {activeSet && (
          <div className="mt-2 text-sm text-gray-600">
            Menampilkan set: <span className="font-semibold text-gray-900">{activeSet}</span>
            <button onClick={() => setActiveSet(null)} className="ml-2 text-red-500 hover:underline text-xs">× hapus filter</button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-56 shrink-0 space-y-4">
          {/* Rarity filter */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-sm text-gray-700 mb-3">Kelangkaan</h3>
            <div className="flex flex-wrap gap-1.5">
              {RARITIES.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRarity(r)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    activeRarity === r
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-sm text-gray-700 mb-3">Rentang Harga</h3>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Harga min (Rp)"
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
              />
              <input
                type="number"
                placeholder="Harga max (Rp)"
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
              />
              <button className="w-full bg-red-600 text-white rounded-lg py-1.5 text-sm font-semibold hover:bg-red-700">
                Terapkan
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort & count bar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-semibold text-gray-800">{MOCK_CARDS.length}</span> kartu
              {activeSet && <span className="text-gray-400"> · {activeSet}</span>}
            </p>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500">
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {MOCK_CARDS.map((card, i) => (
              <Link
                key={i}
                href={`/kartu/${slug}-${i + 1}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 aspect-[3/4] flex items-center justify-center relative">
                  <span className="text-4xl opacity-30">🃏</span>
                  <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                    {card.rarity}
                  </span>
                </div>
                <div className="p-2.5">
                  <div className="font-semibold text-xs text-gray-900 line-clamp-2 mb-1.5 group-hover:text-red-600 transition-colors">
                    {card.name}
                  </div>
                  <div className="text-red-600 font-bold text-xs flex items-center gap-1">
                    <Tag size={10} /> {formatRupiah(card.price)}
                  </div>
                  <div className="text-green-600 text-xs mt-0.5">
                    Buyback: {formatRupiah(card.buyback)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-1">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                  p === 1 ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
