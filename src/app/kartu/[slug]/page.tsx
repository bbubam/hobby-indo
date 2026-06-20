"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Tag, ChevronDown, ChevronUp, Star, Shield, Truck, RotateCcw } from "lucide-react";

const CONDITIONS = [
  { id: "nm", label: "Near Mint (NM)", description: "Kondisi sempurna, tanpa cacat", multiplier: 1.0 },
  { id: "lp", label: "Lightly Played (LP)", description: "Sedikit bekas, hampir sempurna", multiplier: 0.85 },
  { id: "mp", label: "Moderately Played (MP)", description: "Bekas pakai, masih layak", multiplier: 0.65 },
  { id: "hp", label: "Heavily Played (HP)", description: "Banyak bekas, masih bisa dimainkan", multiplier: 0.45 },
];

const MOCK_CARD = {
  name: "Charizard ex (Special Illustration Rare)",
  game: "Pokémon",
  gameSlug: "pokemon",
  set: "Obsidian Flames",
  setCode: "OBF",
  number: "234/197",
  rarity: "Special Illustration Rare (SIR)",
  rarityCode: "SIR",
  artist: "Mitsuhiro Arita",
  type: "Pokémon",
  priceNM: 850000,
  buybackNM: 650000,
  stock: 3,
  description: "Kartu Charizard ex versi Special Illustration Rare dari set Obsidian Flames. Ilustrasi full-art premium dengan efek holografik. Salah satu kartu paling dicari dari set ini.",
};

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function CardDetailPage() {
  const [condition, setCondition] = useState("nm");
  const [qty, setQty] = useState(1);
  const [mode, setMode] = useState<"beli" | "jual">("beli");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const cond = CONDITIONS.find((c) => c.id === condition)!;
  const price = Math.round(MOCK_CARD.priceNM * cond.multiplier);
  const buyback = Math.round(MOCK_CARD.buybackNM * cond.multiplier);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 flex-wrap">
        <Link href="/" className="hover:text-red-600">Beranda</Link>
        <span>/</span>
        <Link href={`/search/${MOCK_CARD.gameSlug}`} className="hover:text-red-600">{MOCK_CARD.game}</Link>
        <span>/</span>
        <Link href={`/search/${MOCK_CARD.gameSlug}`} className="hover:text-red-600">{MOCK_CARD.set}</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-xs">{MOCK_CARD.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left — card image */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl aspect-[3/4] max-w-sm mx-auto flex items-center justify-center shadow-lg relative">
            <span className="text-8xl opacity-20">🃏</span>
            <span className="absolute top-4 right-4 bg-black/60 text-white text-sm font-bold px-3 py-1 rounded-full">
              {MOCK_CARD.rarityCode}
            </span>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            {[
              { icon: Shield, label: "100% Asli", sub: "Garansi keaslian" },
              { icon: Truck, label: "Kirim Cepat", sub: "1-3 hari kerja" },
              { icon: RotateCcw, label: "Retur Mudah", sub: "7 hari garansi" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                <Icon size={20} className="mx-auto mb-1 text-red-600" />
                <div className="text-xs font-bold text-gray-800">{label}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — detail & actions */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{MOCK_CARD.rarityCode}</span>
              <span className="text-gray-500 text-sm">{MOCK_CARD.game} · {MOCK_CARD.set}</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">{MOCK_CARD.name}</h1>
            <div className="text-sm text-gray-500 mt-1">
              {MOCK_CARD.setCode} · #{MOCK_CARD.number} · Ilustrasi: {MOCK_CARD.artist}
            </div>
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-full border border-gray-300 overflow-hidden text-sm font-semibold w-fit">
            <button
              onClick={() => setMode("beli")}
              className={`px-5 py-2 transition-colors ${mode === "beli" ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Beli
            </button>
            <button
              onClick={() => setMode("jual")}
              className={`px-5 py-2 transition-colors ${mode === "jual" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Jual / Buyback
            </button>
          </div>

          {/* Price display */}
          <div className="bg-gray-50 rounded-xl p-4">
            {mode === "beli" ? (
              <>
                <div className="text-sm text-gray-500 mb-0.5">Harga</div>
                <div className="text-3xl font-black text-red-600">{formatRupiah(price)}</div>
                <div className="text-sm text-gray-500 mt-1">Stok tersedia: <span className="font-semibold text-gray-800">{MOCK_CARD.stock} pcs</span></div>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-500 mb-0.5">Harga Buyback</div>
                <div className="text-3xl font-black text-green-600">{formatRupiah(buyback)}</div>
                <div className="text-sm text-gray-500 mt-1">Dibayar ke saldo poin atau transfer bank</div>
              </>
            )}
          </div>

          {/* Condition selector */}
          <div>
            <div className="text-sm font-bold text-gray-700 mb-2">Kondisi Kartu</div>
            <div className="space-y-2">
              {CONDITIONS.map((c) => (
                <label
                  key={c.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    condition === c.id ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="condition"
                    value={c.id}
                    checked={condition === c.id}
                    onChange={() => setCondition(c.id)}
                    className="accent-red-600"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">{c.label}</div>
                    <div className="text-xs text-gray-500">{c.description}</div>
                  </div>
                  <div className="text-sm font-bold shrink-0">
                    {mode === "beli"
                      ? <span className="text-red-600">{formatRupiah(Math.round(MOCK_CARD.priceNM * c.multiplier))}</span>
                      : <span className="text-green-600">{formatRupiah(Math.round(MOCK_CARD.buybackNM * c.multiplier))}</span>
                    }
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          {mode === "beli" && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2.5 hover:bg-gray-100 text-lg font-bold"
                >−</button>
                <span className="px-4 py-2.5 text-sm font-semibold min-w-[40px] text-center">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(MOCK_CARD.stock, qty + 1))}
                  className="px-3 py-2.5 hover:bg-gray-100 text-lg font-bold"
                >+</button>
              </div>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart size={18} /> Masukkan Keranjang
              </button>
            </div>
          )}
          {mode === "jual" && (
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Tag size={18} /> Masukkan ke Keranjang Jual
            </button>
          )}

          {/* Card details table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-700">Detail Kartu</div>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Game", MOCK_CARD.game],
                  ["Set", MOCK_CARD.set],
                  ["Nomor Kartu", MOCK_CARD.number],
                  ["Kelangkaan", MOCK_CARD.rarity],
                  ["Tipe", MOCK_CARD.type],
                  ["Ilustrasi", MOCK_CARD.artist],
                ].map(([key, val]) => (
                  <tr key={key} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 text-gray-500 w-36">{key}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-800">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10 max-w-2xl">
        <h2 className="font-black text-lg text-gray-900 mb-4">Pertanyaan Umum</h2>
        {[
          { q: "Apakah kartu yang dijual 100% asli?", a: "Ya, semua kartu yang kami jual telah melalui proses verifikasi keaslian. Kami memberikan garansi keaslian untuk setiap produk." },
          { q: "Bagaimana cara melakukan buyback?", a: "Pilih mode 'Jual', pilih kondisi kartu, masukkan ke keranjang jual, lalu checkout. Tim kami akan memverifikasi kondisi kartu setelah diterima." },
          { q: "Berapa lama pengiriman?", a: "Pengiriman reguler 2-5 hari kerja. Pengiriman express 1-2 hari kerja. Kami menggunakan JNE, J&T, dan SiCepat." },
          { q: "Apakah bisa retur jika kartu tidak sesuai?", a: "Bisa, dalam 7 hari setelah barang diterima. Kartu harus dalam kondisi yang sama seperti diterima dan disertai bukti foto." },
        ].map((item, i) => (
          <div key={i} className="border-b border-gray-200">
            <button
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              className="w-full text-left py-4 flex items-center justify-between gap-4 font-semibold text-gray-800 hover:text-red-600"
            >
              {item.q}
              {faqOpen === i ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
            </button>
            {faqOpen === i && (
              <p className="pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
