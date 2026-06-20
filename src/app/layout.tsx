import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import GameNav from "@/components/GameNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HobbyIndo Single - Jual Beli Kartu TCG",
  description: "Toko online jual beli kartu TCG single terlengkap di Indonesia. Pokemon, Yu-Gi-Oh!, One Piece, dan banyak lagi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-100">
        <Header />
        <GameNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
