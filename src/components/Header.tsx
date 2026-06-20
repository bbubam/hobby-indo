"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState<"beli" | "jual">("beli");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-red-700 text-white text-xs py-1 text-center">
        Kampanye Poin 2× untuk Anggota! Berlaku s/d 30 Juni 2026 &nbsp;|&nbsp;
        <Link href="/daftar" className="underline hover:text-yellow-200">Daftar sekarang</Link>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-red-600 text-white font-black text-xl px-3 py-1 rounded">
            HI
          </div>
          <div className="leading-tight">
            <div className="font-black text-gray-900 text-lg leading-none">HobbyIndo</div>
            <div className="text-red-600 text-xs font-semibold">SINGLE STORE</div>
          </div>
        </Link>

        {/* Mode toggle */}
        <div className="hidden sm:flex rounded-full border border-gray-300 overflow-hidden text-sm font-semibold">
          <button
            onClick={() => setMode("beli")}
            className={`px-4 py-1.5 transition-colors ${mode === "beli" ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Beli
          </button>
          <button
            onClick={() => setMode("jual")}
            className={`px-4 py-1.5 transition-colors ${mode === "jual" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Jual / Buyback
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama kartu, set, atau game..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:border-red-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
          <Link href="/akun" className="flex flex-col items-center gap-0.5 hover:text-red-600">
            <User size={20} />
            <span className="text-xs">Akun</span>
          </Link>
          <Link href="/keranjang" className="flex flex-col items-center gap-0.5 hover:text-red-600 relative">
            <ShoppingCart size={20} />
            <span className="text-xs">Keranjang</span>
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">0</span>
          </Link>
          <Link href="/keranjang-jual" className="flex flex-col items-center gap-0.5 hover:text-green-600 relative">
            <ShoppingCart size={20} className="text-green-600" />
            <span className="text-xs">Jual</span>
            <span className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">0</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3 text-sm">
          <div className="flex rounded-full border border-gray-300 overflow-hidden font-semibold">
            <button onClick={() => setMode("beli")} className={`flex-1 py-2 ${mode === "beli" ? "bg-red-600 text-white" : ""}`}>Beli</button>
            <button onClick={() => setMode("jual")} className={`flex-1 py-2 ${mode === "jual" ? "bg-green-600 text-white" : ""}`}>Jual / Buyback</button>
          </div>
          <Link href="/akun" className="flex items-center gap-2 py-2 border-b">
            <User size={16} /> Akun Saya
          </Link>
          <Link href="/keranjang" className="flex items-center gap-2 py-2 border-b">
            <ShoppingCart size={16} /> Keranjang Beli (0)
          </Link>
          <Link href="/keranjang-jual" className="flex items-center gap-2 py-2">
            <ShoppingCart size={16} className="text-green-600" /> Keranjang Jual (0)
          </Link>
        </div>
      )}
    </header>
  );
}
