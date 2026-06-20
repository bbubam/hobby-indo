"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CardSet = {
  name: string;
  code: string;
  year: string;
  color: string;
};

const GAME_SETS: Record<string, CardSet[]> = {
  pokemon: [
    { name: "Scarlet & Violet — Stellar Crown", code: "SV07", year: "2024", color: "#E53E3E" },
    { name: "Obsidian Flames", code: "OBF", year: "2023", color: "#744210" },
    { name: "Paldea Evolved", code: "PAL", year: "2023", color: "#2B6CB0" },
    { name: "Scarlet & Violet Base", code: "SVI", year: "2023", color: "#C05621" },
    { name: "Crown Zenith", code: "CRZ", year: "2023", color: "#553C9A" },
    { name: "Silver Tempest", code: "SIT", year: "2022", color: "#2C7A7B" },
    { name: "Lost Origin", code: "LOR", year: "2022", color: "#1A202C" },
    { name: "Pokemon GO", code: "PGO", year: "2022", color: "#276749" },
  ],
  yugioh: [
    { name: "Age of Overlord", code: "AGOV", year: "2023", color: "#702459" },
    { name: "Phantom Nightmare", code: "PHNI", year: "2024", color: "#2D3748" },
    { name: "Legacy of Destruction", code: "LEDE", year: "2024", color: "#744210" },
    { name: "Rage of the Abyss", code: "ROTA", year: "2024", color: "#1A365D" },
    { name: "Quarter Century Bonanza", code: "QCSE", year: "2023", color: "#744210" },
    { name: "Cyberstorm Access", code: "CYAC", year: "2023", color: "#1A202C" },
  ],
  "one-piece": [
    { name: "OP-09 Emperors in the New World", code: "OP-09", year: "2024", color: "#C53030" },
    { name: "OP-08 Two Legends", code: "OP-08", year: "2024", color: "#2C5282" },
    { name: "OP-07 500 Years in the Future", code: "OP-07", year: "2024", color: "#276749" },
    { name: "OP-06 Wings of the Captain", code: "OP-06", year: "2023", color: "#744210" },
    { name: "OP-05 Awakening of the New Era", code: "OP-05", year: "2023", color: "#553C9A" },
    { name: "OP-04 Kingdoms of Intrigue", code: "OP-04", year: "2023", color: "#2D3748" },
  ],
  digimon: [
    { name: "BT-16 Beginning Observer", code: "BT-16", year: "2024", color: "#2B6CB0" },
    { name: "BT-15 Exceed Apocalypse", code: "BT-15", year: "2024", color: "#C53030" },
    { name: "EX-07 Digimon Liberator", code: "EX-07", year: "2024", color: "#276749" },
    { name: "BT-14 Blast Ace", code: "BT-14", year: "2023", color: "#744210" },
    { name: "EX-06 Infernal Ascension", code: "EX-06", year: "2023", color: "#702459" },
    { name: "BT-13 Versus Royal Knights", code: "BT-13", year: "2023", color: "#553C9A" },
  ],
  "weiss-schwarz": [
    { name: "Hololive Production Vol.3", code: "HOL/WE36", year: "2024", color: "#702459" },
    { name: "Blue Archive", code: "BA/W112", year: "2024", color: "#2B6CB0" },
    { name: "Sword Art Online", code: "SAO/S100", year: "2023", color: "#1A202C" },
    { name: "Bocchi the Rock!", code: "BTR/W103", year: "2023", color: "#C05621" },
    { name: "Kaguya-sama: Love is War", code: "KGL/S79", year: "2022", color: "#C53030" },
    { name: "Spy x Family", code: "SXF/S98", year: "2023", color: "#276749" },
  ],
  vanguard: [
    { name: "D-BT14 Onslaught of Dragon Souls", code: "D-BT14", year: "2024", color: "#C53030" },
    { name: "D-BT13 Dragontree Invasion", code: "D-BT13", year: "2024", color: "#276749" },
    { name: "V-SS10 Festival Collection", code: "V-SS10", year: "2023", color: "#553C9A" },
    { name: "D-BT12 Evenfall Onslaught", code: "D-BT12", year: "2023", color: "#1A365D" },
  ],
  "duel-masters": [
    { name: "DM23-EX3", code: "DM23-EX3", year: "2024", color: "#2B6CB0" },
    { name: "DM23-BD1", code: "DM23-BD1", year: "2023", color: "#C53030" },
    { name: "DM22-EX2", code: "DM22-EX2", year: "2022", color: "#744210" },
    { name: "DM22-RP2", code: "DM22-RP2", year: "2022", color: "#276749" },
  ],
  "battle-spirits": [
    { name: "BSS04 Savior of Chaos", code: "BSS04", year: "2024", color: "#C53030" },
    { name: "BSS03 Aquatic Invaders", code: "BSS03", year: "2023", color: "#2B6CB0" },
    { name: "BSS02 False Gods", code: "BSS02", year: "2023", color: "#553C9A" },
  ],
  lorcana: [
    { name: "Ursula's Return", code: "URR", year: "2024", color: "#553C9A" },
    { name: "Into the Inklands", code: "ITI", year: "2024", color: "#2C5282" },
    { name: "Rise of the Floodborn", code: "ROF", year: "2023", color: "#744210" },
    { name: "The First Chapter", code: "TFC", year: "2023", color: "#276749" },
  ],
  gundam: [
    { name: "ST02 Zeon Forces", code: "ST02", year: "2024", color: "#1A202C" },
    { name: "ST01 Earth Federation Forces", code: "ST01", year: "2024", color: "#2B6CB0" },
  ],
  wixoss: [
    { name: "WXDi-P17", code: "WXDi-P17", year: "2024", color: "#702459" },
    { name: "WXDi-P16", code: "WXDi-P16", year: "2023", color: "#C53030" },
    { name: "WXDi-P15", code: "WXDi-P15", year: "2023", color: "#553C9A" },
  ],
  "build-divide": [
    { name: "BD/W127", code: "BD/W127", year: "2024", color: "#276749" },
    { name: "BD/W112", code: "BD/W112", year: "2023", color: "#2B6CB0" },
  ],
  "union-arena": [
    { name: "EX06BT Naruto Shippuden", code: "EX06BT", year: "2024", color: "#C05621" },
    { name: "EX05BT One Piece Film Red", code: "EX05BT", year: "2023", color: "#C53030" },
    { name: "EX04BT Bleach", code: "EX04BT", year: "2023", color: "#1A202C" },
  ],
  hololive: [
    { name: "Hololive 2nd Collection", code: "HOL-02", year: "2024", color: "#702459" },
    { name: "Hololive 1st Collection", code: "HOL-01", year: "2023", color: "#553C9A" },
  ],
  lycee: [
    { name: "Ver. TYPE-MOON 4.0", code: "TM4.0", year: "2024", color: "#C53030" },
    { name: "Ver. Yuzusoft 5.0", code: "YZ5.0", year: "2023", color: "#553C9A" },
  ],
  supply: [
    { name: "Sleeve Premium", code: "SLV", year: "2024", color: "#2D3748" },
    { name: "Deck Box", code: "DBX", year: "2024", color: "#276749" },
    { name: "Binder / Album", code: "BND", year: "2024", color: "#744210" },
    { name: "Playmat", code: "PLM", year: "2024", color: "#2B6CB0" },
  ],
};

export default function SetCarousel({ slug, activeSet, onSelect }: {
  slug: string;
  activeSet: string | null;
  onSelect: (name: string | null) => void;
}) {
  const sets = GAME_SETS[slug] ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

  if (sets.length === 0) return null;

  return (
    <div className="relative">
      {canLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-1 py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* "All" pill */}
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${
            activeSet === null
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
          }`}
        >
          Semua Set
        </button>

        {sets.map((s) => (
          <button
            key={s.code}
            onClick={() => onSelect(s.name)}
            className="shrink-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-2 text-left"
            style={{ borderColor: activeSet === s.name ? s.color : "transparent", minWidth: 160 }}
          >
            {/* Color band */}
            <div className="h-2" style={{ backgroundColor: s.color }} />
            <div className="bg-white px-3 py-2.5">
              <div className="text-xs font-bold text-gray-400 mb-0.5">{s.code} · {s.year}</div>
              <div className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{s.name}</div>
            </div>
          </button>
        ))}
      </div>

      {canRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
