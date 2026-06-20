"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const GAMES = [
  { name: "Pokémon", slug: "pokemon", color: "#FFCB05" },
  { name: "Yu-Gi-Oh!", slug: "yugioh", color: "#8B0000" },
  { name: "One Piece", slug: "one-piece", color: "#D62929" },
  { name: "Digimon", slug: "digimon", color: "#2563EB" },
  { name: "Weiss Schwarz", slug: "weiss-schwarz", color: "#EC4899" },
  { name: "Vanguard", slug: "vanguard", color: "#7C3AED" },
  { name: "Duel Masters", slug: "duel-masters", color: "#1D4ED8" },
  { name: "Battle Spirits", slug: "battle-spirits", color: "#F97316" },
  { name: "Disney Lorcana", slug: "lorcana", color: "#1E40AF" },
  { name: "Gundam Card Game", slug: "gundam", color: "#374151" },
  { name: "WIXOSS", slug: "wixoss", color: "#DB2777" },
  { name: "Build Divide", slug: "build-divide", color: "#059669" },
  { name: "Union Arena", slug: "union-arena", color: "#B45309" },
  { name: "Hololive OCG", slug: "hololive", color: "#6D28D9" },
  { name: "Lycee", slug: "lycee", color: "#BE185D" },
  { name: "Perlengkapan", slug: "supply", color: "#4B5563" },
];

export default function GameNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    scrollRef.current?.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      scrollRef.current?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
  };

  return (
    <nav className="bg-gray-800 text-white relative">
      <div className="max-w-7xl mx-auto flex items-center">
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className="shrink-0 px-2 py-3 hover:bg-gray-700">
            <ChevronLeft size={18} />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GAMES.map((game) => (
            <Link
              key={game.slug}
              href={`/search/${game.slug}`}
              className="shrink-0 px-4 py-3 text-sm font-medium hover:bg-gray-700 whitespace-nowrap border-b-2 border-transparent hover:border-red-500 transition-colors"
            >
              {game.name}
            </Link>
          ))}
        </div>
        {canScrollRight && (
          <button onClick={() => scroll("right")} className="shrink-0 px-2 py-3 hover:bg-gray-700">
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </nav>
  );
}
