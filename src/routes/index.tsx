import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Sparkles, Truck, Leaf, ShieldCheck, Heart, Award, Zap, Star, ArrowRight, Gift } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweetly & Co. — Unwrap Happiness in Every Bite" },
      { name: "description", content: "Premium halal, vegan & irresistible sweets delivered to your door. Pick & Mix, gummies, sour candy and gift bundles, hand-packed fresh in the UK." },
    ],
  }),
  component: HomePage,
});

const TRUST_BADGES = [
  { icon: Truck, label: "Free Shipping over £25" },
  { icon: ShieldCheck, label: "Halal Certified" },
  { icon: Leaf, label: "Vegan Options" },
  { icon: Zap, label: "Fast UK Delivery" },
  { icon: Heart, label: "Loved by 50,000+ Customers" },
  { icon: Award, label: "Award-winning Recipes" },
];

const CATEGORIES = [
  { label: "Gummies", emoji: "🐻", color: "bg-candy-pink/20", href: "/shop" },
  { label: "Sour Candy", emoji: "🍋", color: "bg-mustard/30", href: "/shop" },
  { label: "Pick & Mix", emoji: "🍬", color: "bg-mint/30", href: "/shop" },
  { label: "Freeze Dried", emoji: "❄️", color: "bg-primary/15", href: "/shop" },
  { label: "Bundles", emoji: "🎁", color: "bg-mustard/30", href: "/shop" },
  { label: "Vegan Range", emoji: "🌱", color: "bg-mint/30", href: "/shop" },
];

const SEASONAL = [
  { title: "Birthday Party Packs", img: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80", color: "from-candy-pink to-mustard" },
  { title: "Halloween Specials", img: "https://images.unsplash.com/photo-1572731828307-9af1b0bc9020?auto=format&fit=crop&w=600&q=80", color: "from-primary to-cocoa" },
  { title: "Movie Night Bundles", img: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80", color: "from-mustard to-primary" },
  { title: "Eid Gift Boxes", img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80", color: "from-mint to-mustard" },
];

const TESTIMONIALS = [
  { name: "Aisha K.", text: "Best halal sweets I've ever ordered. The Pick & Mix is unreal — already on my third order!", rating: 5 },
  { name: "Liam P.", text: "Bought the Movie Night Bundle for the family. Everyone fought over the freeze-dried Skittles 😂", rating: 5 },
  { name: "Priya S.", text: "Birthday box for my niece arrived gorgeously packaged. She lost her mind. 10/10.", rating: 5 },
];

function HomePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(8).then((p) => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 candy-gradient opacity-10" />
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-pop-in">
              <span className="inline-flex items-center gap-2 bg-mustard/30 text-cocoa px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5" /> New Drop · Freeze Dried Range
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-cocoa mt-4 leading-[0.95]">
                Unwrap <span className="candy-gradient-text">Happiness</span>
                <br /> in Every Bite
              </h1>
              <p className="mt-5 text-lg text-cocoa/70 max-w-lg mx-auto lg:mx-0">
                Premium halal, vegan &amp; irresistible sweets — hand-packed fresh in the UK and delivered to your door.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/shop">
                  <Button size="lg" className="rounded-full h-14 px-8 text-base font-bold shadow-lg hover:scale-105 transition-transform w-full sm:w-auto">
                    Shop Bestsellers <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-bold border-2 border-cocoa hover:bg-cocoa hover:text-cream w-full sm:w-auto">
                    Build Your Bundle
                  </Button>
                </Link>
              </div>
              <div className="mt-7 flex items-center gap-4 justify-center lg:justify-start text-sm">
                <div className="flex -space-x-2">
                  {["🍭", "🍬", "🍫"].map((e, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-cream border-2 border-cocoa/10 flex items-center justify-center text-base">
                      {e}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-mustard">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-muted-foreground">Rated 4.9 by 12,000+ happy customers</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[520px]">
              <div className="absolute top-8 left-8 h-48 w-48 rounded-full bg-mustard/40 float-candy" style={{ animationDelay: "0s" }} />
              <div className="absolute bottom-12 right-4 h-56 w-56 rounded-full bg-candy-pink/30 float-candy" style={{ animationDelay: "1s" }} />
              <div className="absolute top-32 right-20 h-32 w-32 rounded-full bg-mint/40 float-candy" style={{ animationDelay: "2s" }} />
              <img
                src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=80"
                alt="Glossy candy mix"
                className="absolute inset-0 m-auto w-[85%] h-[85%] object-cover rounded-[3rem] candy-card border-4 border-cream"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-24 w-24 flex flex-col items-center justify-center font-display text-center wiggle sticker">
                <span className="text-xs leading-none">SAVE</span>
                <span className="text-2xl leading-none">20%</span>
                <span className="text-[10px] leading-none mt-0.5">on bundles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee trust bar */}
      <section className="bg-cocoa text-cream py-5 overflow-hidden">
        <div className="marquee">
          <div className="marquee-track">
            {[...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                <b.icon className="h-4 w-4 text-mustard" />
                {b.label}
                <span className="text-mustard mx-3">★</span>
              </div>
            ))}
          </div>
          <div className="marquee-track" aria-hidden>
            {[...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                <b.icon className="h-4 w-4 text-mustard" />
                {b.label}
                <span className="text-mustard mx-3">★</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Shop by Craving</p>
          <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">Pick your sweet poison</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c.label} to="/shop" className="group">
              <div className={`${c.color} aspect-square rounded-3xl flex flex-col items-center justify-center p-4 hover-lift candy-card border-2 border-cocoa/5`}>
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">{c.emoji}</div>
                <p className="font-display text-base text-cocoa text-center">{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-card/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold">Customer favourites</p>
              <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">Bestsellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 font-bold text-primary hover:gap-2 transition-all">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-mustard/15 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products found</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {products.slice(0, 8).map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Why us */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🍓", title: "Real Fruit Flavour", text: "We use real fruit juice and natural extracts — never artificial nasties." },
            { icon: "✨", title: "Premium Ingredients", text: "Sourced from trusted European confectioners. Halal & vegan certified." },
            { icon: "📦", title: "Fresh Packed Daily", text: "Every order is hand-packed in our UK kitchen the day it ships." },
          ].map((c) => (
            <div key={c.title} className="bg-card rounded-3xl p-8 text-center candy-card border-2 border-cocoa/5 hover-lift">
              <div className="text-6xl mb-3">{c.icon}</div>
              <h3 className="font-display text-2xl text-cocoa">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Build Your Bundle */}
      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="relative bg-cocoa text-cream rounded-[2.5rem] overflow-hidden p-8 lg:p-14 grid lg:grid-cols-2 gap-8 items-center">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-candy-pink/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-mustard/30 blur-3xl" />
          <div className="relative">
            <p className="text-mustard text-xs uppercase tracking-widest font-bold">Interactive</p>
            <h2 className="font-display text-4xl lg:text-5xl text-mustard mt-2">Build Your Own Bundle</h2>
            <p className="text-cream/80 mt-3 max-w-md">
              Pick from 60+ sweets to create your perfect mix. Add a name, choose a jar, and we'll do the rest.
            </p>
            <Link to="/shop">
              <Button className="mt-5 rounded-full h-12 px-7 bg-mustard text-cocoa hover:bg-mustard/80 font-bold">
                Start Building <Gift className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="relative grid grid-cols-3 gap-3">
            {["🍬","🍭","🍫","🍡","🧁","🍩","🍪","🥨","🍯"].map((e, i) => (
              <div key={i} className="aspect-square bg-cream/10 backdrop-blur rounded-2xl flex items-center justify-center text-4xl hover:bg-mustard hover:text-cocoa cursor-pointer transition-all hover-lift">
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal */}
      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Limited drops</p>
          <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">Seasonal Sweet Moments</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SEASONAL.map((s) => (
            <Link key={s.title} to="/shop" className="group relative aspect-[3/4] rounded-3xl overflow-hidden hover-lift candy-card">
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-70`} />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="text-xs opacity-90 mt-1 inline-flex items-center gap-1">Shop now <ArrowRight className="h-3 w-3" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Wholesale */}
      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="bg-mustard rounded-[2.5rem] p-8 lg:p-14 text-cocoa flex flex-col lg:flex-row items-center justify-between gap-6 candy-card">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold opacity-70">Trade & Wholesale</p>
            <h2 className="font-display text-3xl lg:text-4xl mt-1">Own a shop? Stock our bestselling sweets.</h2>
            <p className="mt-2 opacity-80 max-w-xl">Low MOQ, fast UK dispatch, exclusive SKUs and full marketing support.</p>
          </div>
          <Link to="/wholesale">
            <Button size="lg" className="rounded-full h-14 px-8 bg-cocoa text-cream hover:bg-cocoa/90 font-bold whitespace-nowrap">
              Become a Stockist <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* UGC */}
      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">@sweetlyandco</p>
          <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">Trending on TikTok</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1572731828307-9af1b0bc9020?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=400&q=80",
          ].map((src, i) => (
            <a key={i} href="#" className="aspect-square rounded-2xl overflow-hidden hover-lift candy-card relative group">
              <img src={src} alt="UGC" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-bold">Sweet Words</p>
            <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">50,000+ happy customers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-cream rounded-3xl p-6 candy-card border-2 border-cocoa/5">
                <div className="flex text-mustard mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-cocoa leading-relaxed">"{t.text}"</p>
                <p className="font-bold text-sm mt-4">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
