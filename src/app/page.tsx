import HeroBanner from "@/components/HeroBanner";
import GameCategories from "@/components/GameCategories";
import FeaturedCards from "@/components/FeaturedCards";
import NewsSection from "@/components/NewsSection";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        <GameCategories />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedCards />
          </div>
          <div>
            <NewsSection />
          </div>
        </div>
      </div>
    </>
  );
}
