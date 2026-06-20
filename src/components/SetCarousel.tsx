"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  title: string;
  subtitle: string;
  color1: string;
  color2: string;
  emoji: string;
};

const GAME_SLIDES: Record<string, Slide[]> = {
  pokemon: [
    { title: "Scarlet & Violet — Stellar Crown", subtitle: "Rilis 2024 · SV07", color1: "#6B21A8", color2: "#A855F7", emoji: "👑" },
    { title: "Twilight Masquerade", subtitle: "Rilis 2024 · SV06", color1: "#1D4ED8", color2: "#60A5FA", emoji: "🎭" },
    { title: "Obsidian Flames", subtitle: "Rilis 2023 · OBF", color1: "#7C2D12", color2: "#F97316", emoji: "🔥" },
    { title: "Paldea Evolved", subtitle: "Rilis 2023 · PAL", color1: "#1E40AF", color2: "#38BDF8", emoji: "⚡" },
  ],
  yugioh: [
    { title: "Legacy of Destruction", subtitle: "Rilis 2024 · LEDE", color1: "#7C2D12", color2: "#FCD34D", emoji: "⚔️" },
    { title: "Phantom Nightmare", subtitle: "Rilis 2024 · PHNI", color1: "#1C1917", color2: "#A78BFA", emoji: "👻" },
    { title: "Age of Overlord", subtitle: "Rilis 2023 · AGOV", color1: "#6B21A8", color2: "#E879F9", emoji: "🏰" },
  ],
  "one-piece": [
    { title: "OP-09 Emperors in the New World", subtitle: "Rilis 2024 · OP-09", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "🏴‍☠️" },
    { title: "OP-08 Two Legends", subtitle: "Rilis 2024 · OP-08", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "⚓" },
    { title: "OP-01 Romance Dawn", subtitle: "Rilis 2022 · OP-01", color1: "#92400E", color2: "#FDE68A", emoji: "🌊" },
  ],
  digimon: [
    { title: "BT-16 Beginning Observer", subtitle: "Rilis 2024 · BT-16", color1: "#1E3A5F", color2: "#93C5FD", emoji: "🦎" },
    { title: "EX-07 Digimon Liberator", subtitle: "Rilis 2024 · EX-07", color1: "#166534", color2: "#86EFAC", emoji: "🌐" },
    { title: "BT-15 Exceed Apocalypse", subtitle: "Rilis 2024 · BT-15", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "💥" },
  ],
  "weiss-schwarz": [
    { title: "Hololive Production Vol.3", subtitle: "Rilis 2024 · HOL/WE36", color1: "#6B21A8", color2: "#E879F9", emoji: "🎤" },
    { title: "Blue Archive", subtitle: "Rilis 2024 · BA/W112", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "📚" },
    { title: "Bocchi the Rock!", subtitle: "Rilis 2023 · BTR/W103", color1: "#9A3412", color2: "#FCA5A5", emoji: "🎸" },
  ],
  vanguard: [
    { title: "D-BT14 Onslaught of Dragon Souls", subtitle: "Rilis 2024 · D-BT14", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "🐉" },
    { title: "D-BT13 Dragontree Invasion", subtitle: "Rilis 2024 · D-BT13", color1: "#166534", color2: "#86EFAC", emoji: "🌳" },
  ],
  "duel-masters": [
    { title: "DM24-RP1", subtitle: "Rilis 2024", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "🔥" },
    { title: "DM23-EX3", subtitle: "Rilis 2023", color1: "#166534", color2: "#86EFAC", emoji: "⚡" },
  ],
  "battle-spirits": [
    { title: "BSS04 Savior of Chaos", subtitle: "Rilis 2024 · BSS04", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "💥" },
    { title: "BSS03 Aquatic Invaders", subtitle: "Rilis 2023 · BSS03", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "🌊" },
  ],
  lorcana: [
    { title: "Ursula's Return", subtitle: "Rilis 2024 · URR", color1: "#4C1D95", color2: "#C4B5FD", emoji: "🐙" },
    { title: "Into the Inklands", subtitle: "Rilis 2024 · ITI", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "✨" },
    { title: "The First Chapter", subtitle: "Rilis 2023 · TFC", color1: "#166534", color2: "#86EFAC", emoji: "📖" },
  ],
  gundam: [
    { title: "ST02 Zeon Forces", subtitle: "Rilis 2024 · ST02", color1: "#1C1917", color2: "#A8A29E", emoji: "🤖" },
    { title: "ST01 Earth Federation Forces", subtitle: "Rilis 2024 · ST01", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "🚀" },
  ],
  wixoss: [
    { title: "WXDi-P17", subtitle: "Rilis 2024", color1: "#6B21A8", color2: "#E879F9", emoji: "🌸" },
    { title: "WXDi-P16", subtitle: "Rilis 2023", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "💫" },
  ],
  "build-divide": [
    { title: "BD/W127", subtitle: "Rilis 2024", color1: "#166534", color2: "#86EFAC", emoji: "🏗️" },
    { title: "BD/W112", subtitle: "Rilis 2023", color1: "#1E3A5F", color2: "#7DD3FC", emoji: "⚙️" },
  ],
  "union-arena": [
    { title: "EX06BT Naruto Shippuden", subtitle: "Rilis 2024", color1: "#92400E", color2: "#FDE68A", emoji: "🍥" },
    { title: "EX05BT One Piece Film Red", subtitle: "Rilis 2023", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "🏴‍☠️" },
  ],
  hololive: [
    { title: "Hololive 2nd Collection", subtitle: "Rilis 2024 · HOL-02", color1: "#6B21A8", color2: "#E879F9", emoji: "🎤" },
    { title: "Hololive 1st Collection", subtitle: "Rilis 2023 · HOL-01", color1: "#4C1D95", color2: "#C4B5FD", emoji: "⭐" },
  ],
  lycee: [
    { title: "Ver. TYPE-MOON 4.0", subtitle: "Rilis 2024", color1: "#7F1D1D", color2: "#FCA5A5", emoji: "🌙" },
    { title: "Ver. Yuzusoft 5.0", subtitle: "Rilis 2023", color1: "#4C1D95", color2: "#C4B5FD", emoji: "🌸" },
  ],
  supply: [
    { title: "Sleeve & Deck Box Terbaru", subtitle: "Aksesoris Premium", color1: "#1C1917", color2: "#A8A29E", emoji: "🛍️" },
    { title: "Playmat Edisi Terbatas", subtitle: "Koleksi 2024", color1: "#166534", color2: "#86EFAC", emoji: "🎮" },
  ],
};

export default function SetCarousel({ slug }: { slug: string }) {
  const slides = GAME_SLIDES[slug] ?? [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[idx];

  return (
    <div className="relative overflow-hidden rounded-xl mb-6" style={{ height: 220 }}>
      {/* Slide */}
      <div
        className="absolute inset-0 flex items-center px-10 gap-8 transition-all duration-700"
        style={{ background: `linear-gradient(135deg, ${slide.color1}, ${slide.color2})` }}
      >
        {/* Big emoji as mock artwork */}
        <div className="text-9xl opacity-80 select-none">{slide.emoji}</div>
        <div className="text-white">
          <div className="text-xs font-semibold opacity-70 uppercase tracking-widest mb-2">Set Terbaru</div>
          <div className="text-3xl font-black leading-tight mb-1">{slide.title}</div>
          <div className="text-sm opacity-80">{slide.subtitle}</div>
          <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur text-white text-sm font-semibold px-5 py-2 rounded-full transition">
            Lihat Kartu →
          </button>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 20 : 8,
              height: 8,
              backgroundColor: i === idx ? "white" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
