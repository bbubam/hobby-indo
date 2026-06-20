"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BANNERS = [
  {
    id: 1,
    title: "Kampanye Poin 2× Anggota",
    subtitle: "Dapatkan poin dua kali lipat untuk setiap pembelian & buyback!",
    cta: "Lihat Detail",
    href: "/promo/poin-2x",
    bgFrom: "#b91c1c",
    bgTo: "#ef4444",
    badge: "Promo Anggota",
  },
  {
    id: 2,
    title: "Pokémon Scarlet & Violet — Tersedia Sekarang",
    subtitle: "Kartu single terbaru sudah bisa dibeli dan dijual di HobbyIndo.",
    cta: "Lihat Kartu",
    href: "/search/pokemon",
    bgFrom: "#eab308",
    bgTo: "#fde047",
    badge: "Baru",
  },
  {
    id: 3,
    title: "One Piece Card Game — Romance Dawn",
    subtitle: "Temukan kartu langka set terbaru dengan harga terbaik.",
    cta: "Belanja Sekarang",
    href: "/search/one-piece",
    bgFrom: "#991b1b",
    bgTo: "#dc2626",
    badge: "Hot",
  },
  {
    id: 4,
    title: "Buyback Instan — Jual Kartu Anda",
    subtitle: "Harga buyback kompetitif, dibayar ke saldo poin atau transfer bank.",
    cta: "Cek Harga Buyback",
    href: "/buyback",
    bgFrom: "#15803d",
    bgTo: "#22c55e",
    badge: "Buyback",
  },
];

export default function HeroBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const banner = BANNERS[idx];

  return (
    <div
      className="relative text-white overflow-hidden"
      style={{ minHeight: 220, background: `linear-gradient(to right, ${banner.bgFrom}, ${banner.bgTo})` }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col justify-center" style={{ minHeight: 220 }}>
        <span className="inline-block bg-white/20 backdrop-blur text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
          {banner.badge}
        </span>
        <h2 className="text-2xl md:text-4xl font-black mb-2 max-w-2xl">{banner.title}</h2>
        <p className="text-white/90 mb-5 max-w-xl">{banner.subtitle}</p>
        <Link
          href={banner.href}
          className="inline-block bg-white text-gray-900 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-gray-100 transition w-fit"
        >
          {banner.cta} →
        </Link>
      </div>

      {/* Controls */}
      <button
        onClick={() => setIdx((i) => (i - 1 + BANNERS.length) % BANNERS.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-1"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % BANNERS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-1"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-white w-5" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
