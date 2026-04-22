import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Sweets — Sweetly & Co." },
      { name: "description", content: "Browse our full range of premium sweets — gummies, sour candy, pick & mix, vegan and halal options. Free UK shipping over £25." },
    ],
  }),
  component: ShopPage,
});

const FILTERS = {
  Type: ["Gummies", "Sour Candy", "Fizzy Candy", "Laces", "Pick & Mix", "Freeze Dried", "Bundles"],
  Dietary: ["Vegan", "Halal", "Gluten Free"],
  Badges: ["Best Seller", "New", "Limited Edition"],
};

function ShopPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");
  const [active, setActive] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts(40).then((p) => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (active.length) {
      list = list.filter((p) => {
        const haystack = [p.node.productType ?? "", ...(p.node.tags ?? [])].join(" ").toLowerCase();
        return active.some((f) => haystack.includes(f.toLowerCase()));
      });
    }
    if (sort === "price-asc") list.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
    if (sort === "price-desc") list.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
    return list;
  }, [products, active, sort]);

  const toggleFilter = (f: string) =>
    setActive((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));

  const FilterPanel = () => (
    <div className="space-y-6">
      {Object.entries(FILTERS).map(([group, items]) => (
        <div key={group}>
          <h4 className="font-display text-lg text-cocoa mb-3">{group}</h4>
          <div className="space-y-2">
            {items.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                <input
                  type="checkbox"
                  checked={active.includes(item)}
                  onChange={() => toggleFilter(item)}
                  className="h-4 w-4 rounded accent-primary"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      ))}
      {active.length > 0 && (
        <Button variant="outline" onClick={() => setActive([])} className="w-full rounded-full">
          Clear all
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Banner */}
      <section className="relative candy-gradient text-white py-14 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-xs uppercase tracking-widest opacity-80">
            <Link to="/">Home</Link> · Shop
          </p>
          <h1 className="font-display text-5xl lg:text-6xl mt-2">Shop All Sweets</h1>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">
            Hand-packed, freshly made, ridiculously delicious. Every bite is a tiny celebration.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-card rounded-3xl p-6 candy-card border-2 border-cocoa/5">
              <h3 className="font-display text-xl text-cocoa mb-4">Filter</h3>
              <FilterPanel />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <p className="text-sm text-muted-foreground">{filtered.length} sweet treats</p>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden rounded-full">
                      <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-cream rounded-t-3xl max-h-[80vh] overflow-y-auto">
                    <h3 className="font-display text-2xl text-cocoa mb-4">Filter</h3>
                    <FilterPanel />
                  </SheetContent>
                </Sheet>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none bg-card border-2 border-cocoa/10 rounded-full px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:border-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-mustard/15 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-3xl">
                <p className="text-6xl mb-3">🍬</p>
                <p className="font-display text-2xl text-cocoa">No products found</p>
                <p className="text-sm text-muted-foreground mt-1">Try clearing your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.slice(0, 6).map((p) => <ProductCard key={p.node.id} product={p} />)}
                </div>

                {/* Promo banner */}
                <div className="my-8 candy-gradient text-white rounded-3xl p-8 text-center candy-card">
                  <p className="font-display text-3xl">Mix 3 Bundles &amp; Save 20%</p>
                  <p className="mt-1 opacity-90">Auto-applied at checkout. Use code <strong>BUNDLE20</strong></p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.slice(6).map((p) => <ProductCard key={p.node.id} product={p} />)}
                </div>
              </>
            )}

            {/* SEO block */}
            <div className="mt-16 bg-card rounded-3xl p-8 candy-card border-2 border-cocoa/5">
              <h2 className="font-display text-2xl text-cocoa">Premium sweets, delivered across the UK</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Sweetly &amp; Co. brings together the UK's most-loved candy in one curated shop. From classic Pick &amp; Mix and gummy bears to the latest viral freeze-dried sweets, every product is hand-packed fresh in our London kitchen. We're proudly halal-certified, with a growing vegan range and gluten-free options to keep everyone smiling. Free UK shipping over £25, dispatched in 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
