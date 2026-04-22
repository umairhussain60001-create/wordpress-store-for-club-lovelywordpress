import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80";

const STICKER_FROM_TAG: Record<string, { label: string; color: string }> = {
  bestseller: { label: "Best Seller", color: "bg-primary text-primary-foreground" },
  new: { label: "New Drop", color: "bg-mint text-cocoa" },
  trending: { label: "TikTok Viral", color: "bg-candy-pink text-white" },
  vegan: { label: "Vegan", color: "bg-mint text-cocoa" },
  halal: { label: "Halal", color: "bg-mustard text-cocoa" },
  "tiktok": { label: "TikTok Viral", color: "bg-candy-pink text-white" },
};

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const variant = p.variants.edges[0]?.node;
  const image = p.images.edges[0]?.node?.url ?? FALLBACK_IMG;
  const image2 = p.images.edges[1]?.node?.url ?? image;
  const price = p.priceRange.minVariantPrice.amount;
  const compareAt = variant?.compareAtPrice?.amount;
  const currency = p.priceRange.minVariantPrice.currencyCode;
  const onSale = compareAt && parseFloat(compareAt) > parseFloat(price);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.ids.includes(p.id));

  const tags = p.tags ?? [];
  const sticker = tags
    .map((t) => STICKER_FROM_TAG[t.toLowerCase()])
    .find(Boolean);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your sweet bag! 🍬", { position: "top-center" });
  };

  return (
    <Link
      to="/products/$handle"
      params={{ handle: p.handle }}
      className="group block hover-lift"
    >
      <div className="relative bg-card rounded-3xl overflow-hidden candy-card border-2 border-cocoa/5">
        {/* Sticker badge */}
        {sticker && (
          <div className={`absolute top-3 left-3 z-10 ${sticker.color} text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide rotate-[-6deg] sticker`}>
            {sticker.label}
          </div>
        )}
        {onSale && (
          <div className="absolute top-3 right-3 z-10 bg-mustard text-cocoa text-[11px] font-black px-2 py-1 rounded-full">
            SAVE {formatMoney(parseFloat(compareAt!) - parseFloat(price), currency)}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWish(p.id);
          }}
          className="absolute top-3 right-3 z-20 sm:hidden bg-cream/90 h-8 w-8 rounded-full flex items-center justify-center"
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${isWished ? "fill-primary text-primary" : ""}`} />
        </button>

        {/* Image */}
        <div className="relative aspect-square bg-mustard/15 overflow-hidden">
          <img
            src={image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {image2 !== image && (
            <img
              src={image2}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          {/* Quick actions */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hidden sm:flex">
            <Button
              onClick={handleAdd}
              disabled={isLoading || !variant}
              className="flex-1 rounded-full h-10 font-bold"
              size="sm"
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Quick Add
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWish(p.id);
              }}
              className="rounded-full bg-cream h-10 w-10 border-cocoa/10"
              aria-label="Wishlist"
            >
              <Heart className={`h-4 w-4 ${isWished ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-bold">
            {p.productType || "Sweets"}
          </p>
          <h3 className="font-bold text-cocoa mt-1 leading-tight line-clamp-2 min-h-[2.5rem]">
            {p.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-mustard">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(120)</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display text-xl text-primary">{formatMoney(price, currency)}</span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatMoney(compareAt!, currency)}
              </span>
            )}
          </div>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant}
            className="sm:hidden w-full mt-3 rounded-full"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-1" /> Add to Bag
          </Button>
        </div>
      </div>
    </Link>
  );
}
