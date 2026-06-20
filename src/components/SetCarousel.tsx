"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CardSet = {
  name: string;
  code: string;
  year: string;
  color: string;
};

export type SetGroup = {
  series: string;
  sets: CardSet[];
};

export const GAME_SET_GROUPS: Record<string, SetGroup[]> = {
  pokemon: [
    {
      series: "Scarlet & Violet (SV)",
      sets: [
        { name: "Stellar Crown", code: "SV07", year: "2024", color: "#6B21A8" },
        { name: "Twilight Masquerade", code: "SV06", year: "2024", color: "#1D4ED8" },
        { name: "Temporal Forces", code: "SV05", year: "2024", color: "#B45309" },
        { name: "Paradox Rift", code: "SV04", year: "2023", color: "#065F46" },
        { name: "Obsidian Flames", code: "OBF", year: "2023", color: "#7C2D12" },
        { name: "Paldea Evolved", code: "PAL", year: "2023", color: "#1E40AF" },
        { name: "Scarlet & Violet Base", code: "SVI", year: "2023", color: "#9A3412" },
      ],
    },
    {
      series: "Sword & Shield (SS)",
      sets: [
        { name: "Crown Zenith", code: "CRZ", year: "2023", color: "#4C1D95" },
        { name: "Silver Tempest", code: "SIT", year: "2022", color: "#164E63" },
        { name: "Lost Origin", code: "LOR", year: "2022", color: "#1C1917" },
        { name: "Pokemon GO", code: "PGO", year: "2022", color: "#166534" },
        { name: "Astral Radiance", code: "ASR", year: "2022", color: "#1E3A5F" },
        { name: "Brilliant Stars", code: "BRS", year: "2022", color: "#713F12" },
      ],
    },
    {
      series: "Sun & Moon (SM)",
      sets: [
        { name: "Cosmic Eclipse", code: "CEC", year: "2019", color: "#1E1B4B" },
        { name: "Hidden Fates", code: "HIF", year: "2019", color: "#7F1D1D" },
        { name: "Unified Minds", code: "UNM", year: "2019", color: "#064E3B" },
        { name: "Unbroken Bonds", code: "UNB", year: "2019", color: "#1A2E05" },
      ],
    },
  ],
  yugioh: [
    {
      series: "2024",
      sets: [
        { name: "Legacy of Destruction", code: "LEDE", year: "2024", color: "#7C2D12" },
        { name: "Phantom Nightmare", code: "PHNI", year: "2024", color: "#1C1917" },
        { name: "Rage of the Abyss", code: "ROTA", year: "2024", color: "#1E3A5F" },
      ],
    },
    {
      series: "2023",
      sets: [
        { name: "Age of Overlord", code: "AGOV", year: "2023", color: "#6B21A8" },
        { name: "Quarter Century Bonanza", code: "QCSE", year: "2023", color: "#92400E" },
        { name: "Cyberstorm Access", code: "CYAC", year: "2023", color: "#164E63" },
        { name: "Darkwing Blast", code: "DABL", year: "2023", color: "#1C1917" },
      ],
    },
  ],
  "one-piece": [
    {
      series: "OP Series",
      sets: [
        { name: "OP-09 Emperors in the New World", code: "OP-09", year: "2024", color: "#7F1D1D" },
        { name: "OP-08 Two Legends", code: "OP-08", year: "2024", color: "#1E3A5F" },
        { name: "OP-07 500 Years in the Future", code: "OP-07", year: "2024", color: "#166534" },
        { name: "OP-06 Wings of the Captain", code: "OP-06", year: "2023", color: "#92400E" },
        { name: "OP-05 Awakening of the New Era", code: "OP-05", year: "2023", color: "#4C1D95" },
        { name: "OP-04 Kingdoms of Intrigue", code: "OP-04", year: "2023", color: "#1C1917" },
        { name: "OP-03 Pillars of Strength", code: "OP-03", year: "2023", color: "#164E63" },
        { name: "OP-02 Paramount War", code: "OP-02", year: "2022", color: "#7C2D12" },
        { name: "OP-01 Romance Dawn", code: "OP-01", year: "2022", color: "#B45309" },
      ],
    },
  ],
  digimon: [
    {
      series: "BT Series",
      sets: [
        { name: "BT-16 Beginning Observer", code: "BT-16", year: "2024", color: "#1E3A5F" },
        { name: "BT-15 Exceed Apocalypse", code: "BT-15", year: "2024", color: "#7F1D1D" },
        { name: "BT-14 Blast Ace", code: "BT-14", year: "2023", color: "#92400E" },
        { name: "BT-13 Versus Royal Knights", code: "BT-13", year: "2023", color: "#4C1D95" },
      ],
    },
    {
      series: "EX Series",
      sets: [
        { name: "EX-07 Digimon Liberator", code: "EX-07", year: "2024", color: "#166534" },
        { name: "EX-06 Infernal Ascension", code: "EX-06", year: "2023", color: "#1C1917" },
        { name: "EX-05 Animal Colosseum", code: "EX-05", year: "2023", color: "#164E63" },
      ],
    },
  ],
  "weiss-schwarz": [
    {
      series: "2024",
      sets: [
        { name: "Hololive Production Vol.3", code: "HOL/WE36", year: "2024", color: "#6B21A8" },
        { name: "Blue Archive", code: "BA/W112", year: "2024", color: "#1E3A5F" },
        { name: "Frieren: Beyond Journey's End", code: "FRI/W114", year: "2024", color: "#166534" },
      ],
    },
    {
      series: "2023",
      sets: [
        { name: "Bocchi the Rock!", code: "BTR/W103", year: "2023", color: "#9A3412" },
        { name: "Sword Art Online", code: "SAO/S100", year: "2023", color: "#1C1917" },
        { name: "Spy x Family", code: "SXF/S98", year: "2023", color: "#166534" },
      ],
    },
  ],
  vanguard: [
    {
      series: "D Series",
      sets: [
        { name: "D-BT14 Onslaught of Dragon Souls", code: "D-BT14", year: "2024", color: "#7F1D1D" },
        { name: "D-BT13 Dragontree Invasion", code: "D-BT13", year: "2024", color: "#166534" },
        { name: "D-BT12 Evenfall Onslaught", code: "D-BT12", year: "2023", color: "#1E3A5F" },
      ],
    },
    {
      series: "V Series",
      sets: [
        { name: "V-SS10 Festival Collection", code: "V-SS10", year: "2023", color: "#4C1D95" },
        { name: "V-BT12 Divine Lightning Radiance", code: "V-BT12", year: "2022", color: "#92400E" },
      ],
    },
  ],
  "duel-masters": [
    {
      series: "2024",
      sets: [
        { name: "DM24-RP1", code: "DM24-RP1", year: "2024", color: "#1E3A5F" },
        { name: "DM23-EX3", code: "DM23-EX3", year: "2023", color: "#166534" },
        { name: "DM23-BD1", code: "DM23-BD1", year: "2023", color: "#7F1D1D" },
      ],
    },
  ],
  "battle-spirits": [
    {
      series: "Saga Series",
      sets: [
        { name: "BSS04 Savior of Chaos", code: "BSS04", year: "2024", color: "#7F1D1D" },
        { name: "BSS03 Aquatic Invaders", code: "BSS03", year: "2023", color: "#1E3A5F" },
        { name: "BSS02 False Gods", code: "BSS02", year: "2023", color: "#4C1D95" },
      ],
    },
  ],
  lorcana: [
    {
      series: "All Sets",
      sets: [
        { name: "Ursula's Return", code: "URR", year: "2024", color: "#4C1D95" },
        { name: "Into the Inklands", code: "ITI", year: "2024", color: "#1E3A5F" },
        { name: "Rise of the Floodborn", code: "ROF", year: "2023", color: "#92400E" },
        { name: "The First Chapter", code: "TFC", year: "2023", color: "#166534" },
      ],
    },
  ],
  gundam: [
    {
      series: "Starter Decks",
      sets: [
        { name: "ST02 Zeon Forces", code: "ST02", year: "2024", color: "#1C1917" },
        { name: "ST01 Earth Federation Forces", code: "ST01", year: "2024", color: "#1E3A5F" },
      ],
    },
  ],
  wixoss: [
    {
      series: "Diva Selection",
      sets: [
        { name: "WXDi-P17", code: "WXDi-P17", year: "2024", color: "#6B21A8" },
        { name: "WXDi-P16", code: "WXDi-P16", year: "2023", color: "#7F1D1D" },
        { name: "WXDi-P15", code: "WXDi-P15", year: "2023", color: "#4C1D95" },
      ],
    },
  ],
  "build-divide": [
    {
      series: "All Sets",
      sets: [
        { name: "BD/W127", code: "BD/W127", year: "2024", color: "#166534" },
        { name: "BD/W112", code: "BD/W112", year: "2023", color: "#1E3A5F" },
      ],
    },
  ],
  "union-arena": [
    {
      series: "EX Series",
      sets: [
        { name: "EX06BT Naruto Shippuden", code: "EX06BT", year: "2024", color: "#92400E" },
        { name: "EX05BT One Piece Film Red", code: "EX05BT", year: "2023", color: "#7F1D1D" },
        { name: "EX04BT Bleach", code: "EX04BT", year: "2023", color: "#1C1917" },
      ],
    },
  ],
  hololive: [
    {
      series: "Collections",
      sets: [
        { name: "Hololive 2nd Collection", code: "HOL-02", year: "2024", color: "#6B21A8" },
        { name: "Hololive 1st Collection", code: "HOL-01", year: "2023", color: "#4C1D95" },
      ],
    },
  ],
  lycee: [
    {
      series: "Ver. Series",
      sets: [
        { name: "Ver. TYPE-MOON 4.0", code: "TM4.0", year: "2024", color: "#7F1D1D" },
        { name: "Ver. Yuzusoft 5.0", code: "YZ5.0", year: "2023", color: "#4C1D95" },
      ],
    },
  ],
  supply: [
    {
      series: "Aksesoris",
      sets: [
        { name: "Sleeve Premium", code: "SLV", year: "2024", color: "#1C1917" },
        { name: "Deck Box", code: "DBX", year: "2024", color: "#166534" },
        { name: "Binder / Album", code: "BND", year: "2024", color: "#92400E" },
        { name: "Playmat", code: "PLM", year: "2024", color: "#1E3A5F" },
      ],
    },
  ],
};

function SingleRow({ sets }: { sets: CardSet[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    update();
    scrollRef.current?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      scrollRef.current?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });

  return (
    <div className="relative">
      {canLeft && (
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5">
          <ChevronLeft size={16} />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto py-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {sets.map((s) => (
          <div
            key={s.code}
            className="shrink-0 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ width: 130 }}
          >
            <div
              className="flex flex-col items-center justify-center gap-2 text-white"
              style={{ backgroundColor: s.color, height: 175 }}
            >
              <span className="text-4xl">🃏</span>
              <span className="text-xs font-bold px-2 text-center leading-tight opacity-90">{s.code}</span>
            </div>
            <div className="bg-white px-2 py-2">
              <div className="text-xs text-gray-400">{s.year}</div>
              <div className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{s.name}</div>
            </div>
          </div>
        ))}
      </div>
      {canRight && (
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5">
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

export default function SetCarousel({ slug }: { slug: string }) {
  const groups = GAME_SET_GROUPS[slug] ?? [];
  if (groups.length === 0) return null;

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.series}>
          <h3 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 rounded-full inline-block" />
            {group.series}
          </h3>
          <SingleRow sets={group.sets} />
        </div>
      ))}
    </div>
  );
}
