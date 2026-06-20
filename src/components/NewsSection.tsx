import Link from "next/link";
import { Megaphone } from "lucide-react";

const NEWS = [
  {
    date: "2026-06-20",
    tag: "Promo",
    tagColor: "bg-red-100 text-red-700",
    title: "Kampanye Poin 2× Anggota — Berlaku 1–30 Juni 2026",
    href: "/berita/poin-2x-juni",
  },
  {
    date: "2026-06-18",
    tag: "Rilis Baru",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "[Pokémon] Scarlet & Violet — Stellar Crown sudah tersedia untuk dibeli & dijual",
    href: "/berita/sv-stellar-crown",
  },
  {
    date: "2026-06-17",
    tag: "Rilis Baru",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "[One Piece] OP-09 Emperors in the New World — Mulai dijual hari ini",
    href: "/berita/op-09",
  },
  {
    date: "2026-06-15",
    tag: "Sistem",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Peningkatan keamanan transaksi kartu kredit — Apa yang berubah?",
    href: "/berita/keamanan-kartu-kredit",
  },
  {
    date: "2026-06-12",
    tag: "Pengiriman",
    tagColor: "bg-gray-100 text-gray-700",
    title: "Info keterlambatan pengiriman akibat cuaca ekstrem di beberapa wilayah",
    href: "/berita/keterlambatan-pengiriman",
  },
  {
    date: "2026-06-10",
    tag: "Rilis Baru",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "[Yu-Gi-Oh!] Age of Overlord — Kartu single siap dibeli",
    href: "/berita/age-of-overlord",
  },
  {
    date: "2026-06-08",
    tag: "Promo",
    tagColor: "bg-red-100 text-red-700",
    title: "[Weiss Schwarz] Diskon 10% untuk bundle Weiss Schwarz Hololive edisi terbatas",
    href: "/berita/weiss-hololive-diskon",
  },
  {
    date: "2026-06-05",
    tag: "Rilis Baru",
    tagColor: "bg-yellow-100 text-yellow-700",
    title: "[Digimon] BT-16 Beginning Observer — Daftar lengkap kartu kini tersedia",
    href: "/berita/bt16",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function NewsSection() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-gray-900 text-lg flex items-center gap-2">
          <Megaphone size={18} className="text-red-600" /> Berita & Pengumuman
        </h2>
        <Link href="/berita" className="text-sm text-red-600 hover:underline font-medium">
          Semua berita →
        </Link>
      </div>
      <ul className="divide-y divide-gray-100">
        {NEWS.map((item, i) => (
          <li key={i} className="py-2.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-xs text-gray-400 shrink-0 w-24">{formatDate(item.date)}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 w-fit ${item.tagColor}`}>
              {item.tag}
            </span>
            <Link href={item.href} className="text-sm text-gray-800 hover:text-red-600 hover:underline line-clamp-2">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
