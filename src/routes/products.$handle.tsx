import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchProductByHandle, fetchProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ProductCard } from "@/components/site/ProductCard";
import { Star, Truck, ShieldCheck, Leaf, Zap, Heart, Gift, Plus, Minus, Loader2, Flame } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — Sweetly & Co.` },
      { name: "description", content: "Premium hand-packed sweets at Sweetly & Co." },
    ],
  }),
  component: ProductPage,
});

type Product = ShopifyProduct["node"];

function ProductPage() {
  const { handle } = useParams({ from: "/products/$handle" });
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<ShopifyProduct[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [subscribe, setSubscribe] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => (product ? s.ids.includes(product.id) : false));

  useEffect(() => {
    setLoading(true);
    fetchProductByHandle(handle).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        const init: Record<string, string> = {};
        p.options.forEach((opt) => (init[opt.name] = opt.values[0]));
        setSelected(init);
      }
    });
    fetchProducts(8).then(setRelated);
  }, [handle]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-mustard/15 rounded-3xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-mustard/15 rounded-full animate-pulse" />
            <div className="h-12 bg-mustard/15 rounded-full animate-pulse w-2/3" />
            <div className="h-32 bg-mustard/15 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-6xl">🍬</p>
        <h1 className="font-display text-3xl text-cocoa mt-3">Product not found</h1>
        <Link to="/shop"><Button className="mt-4 rounded-full">Back to shop</Button></Link>
      </div>
    );
  }

  const variant =
    product.variants.edges.find((v) =>
      v.node.selectedOptions.every((o) => selected[o.name] === o.value),
    )?.node ?? product.variants.edges[0]?.node;

  const images = product.images.edges.length > 0
    ? product.images.edges.map((e) => e.node.url)
    : ["https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=800&q=80"];

  const price = variant?.price.amount ?? product.priceRange.minVariantPrice.amount;
  const compareAt = variant?.compareAtPrice?.amount;
  const currency = variant?.price.currencyCode ?? "GBP";
  const onSale = compareAt && parseFloat(compareAt) > parseFloat(price);

  const handleAdd = async (buyNow = false) => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions,
    });
    toast.success(`Added ${qty} to your sweet bag! 🍬`, { position: "top-center" });
    if (buyNow) setCartOpen(true);
  };

  return (
    <>
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <p className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link> · <Link to="/shop" className="hover:text-primary">Shop</Link> · <span className="text-cocoa">{product.title}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-square bg-mustard/15 rounded-3xl overflow-hidden candy-card">
              <img src={images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
              {onSale && (
                <div className="absolute top-4 left-4 bg-mustard text-cocoa text-xs font-black px-3 py-1.5 rounded-full sticker rotate-[-6deg]">
                  SAVE {formatMoney(parseFloat(compareAt!) - parseFloat(price), currency)}
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 ${i === activeImage ? "border-primary" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-bold">{product.productType ?? "Sweets"}</p>
            <h1 className="font-display text-4xl lg:text-5xl text-cocoa mt-1 leading-tight">{product.title}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-mustard">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-sm text-muted-foreground">4.9 (2,348 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display text-4xl text-primary">{formatMoney(price, currency)}</span>
              {onSale && <span className="text-lg text-muted-foreground line-through">{formatMoney(compareAt!, currency)}</span>}
            </div>

            <p className="mt-4 text-cocoa/80 leading-relaxed">{product.description}</p>

            {/* Variant options */}
            {product.options.filter((o) => o.values[0] !== "Default Title").map((opt) => (
              <div key={opt.name} className="mt-6">
                <p className="text-sm font-bold text-cocoa mb-2">
                  {opt.name}: <span className="font-normal text-muted-foreground">{selected[opt.name]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelected((s) => ({ ...s, [opt.name]: v }))}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                        selected[opt.name] === v
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-cocoa/15 hover:border-primary"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity + actions */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-card rounded-full border-2 border-cocoa/10 px-2 h-12">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 flex items-center justify-center" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-8 w-8 flex items-center justify-center" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <Button onClick={() => handleAdd(false)} disabled={isLoading || !variant} className="flex-1 rounded-full h-12 font-bold">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button onClick={() => handleAdd(true)} disabled={isLoading || !variant} variant="outline" className="rounded-full h-12 border-2 border-cocoa font-bold hover:bg-cocoa hover:text-cream">
                Buy Now
              </Button>
              <Button onClick={() => toggleWish(product.id)} variant="outline" className="rounded-full h-12 border-2 border-cocoa/15 font-bold">
                <Heart className={`h-4 w-4 mr-1 ${isWished ? "fill-primary text-primary" : ""}`} /> Wishlist
              </Button>
            </div>

            <button className="w-full mt-3 rounded-full h-12 border-2 border-dashed border-mustard text-cocoa font-medium hover:bg-mustard/20 transition-colors flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" /> Send as a gift
            </button>

            {/* Subscription */}
            <label className="mt-4 flex items-start gap-3 p-4 bg-mustard/15 rounded-2xl cursor-pointer">
              <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
              <div className="flex-1">
                <p className="font-bold text-sm text-cocoa">Subscribe &amp; Save 15%</p>
                <p className="text-xs text-muted-foreground">Get this delivered every month. Cancel anytime.</p>
              </div>
              <span className="font-display text-primary">-15%</span>
            </label>

            {/* Trust */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { icon: Zap, label: "Fresh Packed" },
                { icon: Truck, label: "Fast Dispatch" },
                { icon: ShieldCheck, label: "Secure Checkout" },
                { icon: Leaf, label: "Halal Friendly" },
              ].map((b) => (
                <div key={b.label} className="bg-card rounded-2xl p-3 text-center border border-cocoa/5">
                  <b.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="font-medium text-cocoa">{b.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1 text-mint font-bold">
                <Truck className="h-4 w-4" /> Ships in 24 hours
              </span>
              <span className="inline-flex items-center gap-1 text-primary font-bold">
                <Flame className="h-4 w-4" /> Only 12 left today
              </span>
            </div>

            {/* Tabs */}
            <Accordion type="single" collapsible defaultValue="desc" className="mt-8 border-t-2 border-cocoa/10">
              {[
                { id: "desc", title: "Description", body: product.description },
                { id: "ing", title: "Ingredients", body: "Glucose syrup, sugar, gelatine (halal), citric acid, natural fruit flavours, natural colours from fruit & vegetable concentrates." },
                { id: "nut", title: "Nutrition", body: "Per 100g — Energy 1450kJ/345kcal, Fat 0.1g, Carbs 80g (of which sugars 60g), Protein 5g, Salt 0.05g." },
                { id: "ship", title: "Shipping", body: "Free UK shipping over £25. Standard 2–3 days, Express next day. International 5–10 days." },
                { id: "faq", title: "FAQ", body: "Halal certified, contains no pork or alcohol. Ask us anything at hello@sweetly.co." },
              ].map((t) => (
                <AccordionItem key={t.id} value={t.id} className="border-b border-cocoa/10">
                  <AccordionTrigger className="font-display text-lg text-cocoa hover:no-underline">{t.title}</AccordionTrigger>
                  <AccordionContent className="text-sm text-cocoa/80 leading-relaxed">{t.body}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Frequently bought together */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl lg:text-4xl text-cocoa mb-6">Customers also buy</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.filter((r) => r.node.handle !== handle).slice(0, 4).map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-card rounded-3xl p-8 candy-card border-2 border-cocoa/5">
          <h2 className="font-display text-3xl text-cocoa">Reviews</h2>
          <p className="text-sm text-muted-foreground mt-2">No reviews yet. Be the first to share your sweet experience!</p>
          <Button variant="outline" className="mt-4 rounded-full">Write a review</Button>
        </div>
      </section>

      {/* Sticky mobile add to cart */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-cream/95 backdrop-blur border-t-2 border-cocoa/10 p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground line-clamp-1">{product.title}</p>
          <p className="font-display text-xl text-primary">{formatMoney(price, currency)}</p>
        </div>
        <Button onClick={() => handleAdd(false)} disabled={isLoading || !variant} className="rounded-full h-11 px-6 font-bold">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
        </Button>
      </div>
    </>
  );
}
