import { notFound } from "next/navigation";
import SearchPageClient from "./SearchPageClient";

const GAMES: Record<string, { name: string; emoji: string; description: string }> = {
  pokemon: { name: "Pokémon", emoji: "⚡", description: "Kartu single Pokémon TCG — dari Base Set hingga Scarlet & Violet terbaru." },
  yugioh: { name: "Yu-Gi-Oh!", emoji: "🃏", description: "Kartu single Yu-Gi-Oh! OCG & TCG — dari Classic hingga Master Duel era." },
  "one-piece": { name: "One Piece Card Game", emoji: "🏴‍☠️", description: "Kartu single One Piece Card Game — semua set tersedia." },
  digimon: { name: "Digimon Card Game", emoji: "🦎", description: "Kartu single Digimon Card Game — BT series dan EX series." },
  "weiss-schwarz": { name: "Weiss Schwarz", emoji: "💎", description: "Kartu single Weiss Schwarz — berbagai title anime dan game." },
  vanguard: { name: "Cardfight!! Vanguard", emoji: "⚔️", description: "Kartu single Vanguard — V Series, D Series, dan lebih banyak." },
  "duel-masters": { name: "Duel Masters", emoji: "🔥", description: "Kartu single Duel Masters — game kartu legendaris dari Jepang." },
  "battle-spirits": { name: "Battle Spirits", emoji: "💥", description: "Kartu single Battle Spirits Saga." },
  lorcana: { name: "Disney Lorcana", emoji: "✨", description: "Kartu single Disney Lorcana — kartu koleksi dunia Disney." },
  gundam: { name: "Gundam Card Game", emoji: "🤖", description: "Kartu single Gundam Card Game resmi Bandai." },
  wixoss: { name: "WIXOSS", emoji: "🌸", description: "Kartu single WIXOSS — Diva Selection dan Dissona." },
  "build-divide": { name: "Build Divide", emoji: "🏗️", description: "Kartu single Build Divide — TCG original dari Aniplex." },
  "union-arena": { name: "Union Arena", emoji: "🎮", description: "Kartu single Union Arena — TCG crossover anime dari Bandai." },
  hololive: { name: "Hololive OCG", emoji: "🎤", description: "Kartu single Hololive OCG — koleksi resmi VTuber Hololive." },
  lycee: { name: "Lycee Overture", emoji: "🌙", description: "Kartu single Lycee Overture — TCG dengan ilustrasi anime." },
  supply: { name: "Perlengkapan", emoji: "🛍️", description: "Sleeve kartu, deck box, binder, dan aksesoris TCG lainnya." },
};

export async function generateStaticParams() {
  return Object.keys(GAMES).map((slug) => ({ slug }));
}

export default async function SearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = GAMES[slug];
  if (!game) notFound();
  return <SearchPageClient slug={slug} game={game} />;
}
