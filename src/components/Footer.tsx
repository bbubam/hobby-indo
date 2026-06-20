import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-red-600 text-white font-black text-lg px-2.5 py-0.5 rounded">HI</div>
            <span className="text-white font-black text-base">HobbyIndo Single</span>
          </div>
          <p className="text-xs leading-relaxed">
            Toko online jual beli kartu TCG single terlengkap di Indonesia. Harga transparan, pengiriman cepat.
          </p>
        </div>

        {/* Layanan */}
        <div>
          <h3 className="text-white font-bold mb-3">Layanan</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/beli" className="hover:text-white">Beli Kartu Single</Link></li>
            <li><Link href="/buyback" className="hover:text-white">Buyback / Jual Kartu</Link></li>
            <li><Link href="/poin" className="hover:text-white">Program Poin</Link></li>
            <li><Link href="/pengiriman" className="hover:text-white">Info Pengiriman</Link></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="text-white font-bold mb-3">Bantuan</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/kontak" className="hover:text-white">Hubungi Kami</Link></li>
            <li><Link href="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
            <li><Link href="/privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
          </ul>
        </div>

        {/* Akun */}
        <div>
          <h3 className="text-white font-bold mb-3">Akun</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/daftar" className="hover:text-white">Daftar Akun</Link></li>
            <li><Link href="/masuk" className="hover:text-white">Masuk</Link></li>
            <li><Link href="/akun/pesanan" className="hover:text-white">Riwayat Pesanan</Link></li>
            <li><Link href="/akun/poin" className="hover:text-white">Saldo Poin</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © 2026 HobbyIndo Single. Semua hak dilindungi.
      </div>
    </footer>
  );
}
