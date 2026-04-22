import { useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, Loader2, ExternalLink, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";
import { Link } from "@tanstack/react-router";

const FREE_SHIPPING_THRESHOLD = 25;

export function CartDrawer() {
  const { items, isOpen, setOpen, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "GBP";
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-cream p-0">
        <SheetHeader className="p-6 border-b-2 border-cocoa/10 flex-shrink-0">
          <SheetTitle className="font-display text-2xl text-cocoa flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Sweet Bag ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-mustard/15 border-b border-cocoa/10 flex-shrink-0">
            {remainingForFree > 0 ? (
              <p className="text-xs text-cocoa font-medium mb-2">
                You're <span className="text-primary font-bold">{formatMoney(remainingForFree, currency)}</span> away from free shipping!
              </p>
            ) : (
              <p className="text-xs text-cocoa font-bold mb-2 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> You unlocked FREE shipping!
              </p>
            )}
            <div className="h-2 bg-cocoa/10 rounded-full overflow-hidden">
              <div
                className="h-full candy-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="h-20 w-20 rounded-full bg-mustard/30 flex items-center justify-center mb-4 wiggle">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-display text-xl text-cocoa">Your bag is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Time to fill it with something sweet ✨
            </p>
            <Link to="/shop" onClick={() => setOpen(false)}>
              <Button className="rounded-full">Shop Bestsellers</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3 bg-card rounded-2xl p-3 candy-card">
                  <Link
                    to="/products/$handle"
                    params={{ handle: item.product.node.handle }}
                    onClick={() => setOpen(false)}
                    className="w-20 h-20 bg-mustard/15 rounded-xl overflow-hidden flex-shrink-0"
                  >
                    {item.product.node.images?.edges?.[0]?.node ? (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🍬</div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm leading-tight truncate">{item.product.node.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.selectedOptions
                        .filter((o) => o.value !== "Default Title")
                        .map((o) => o.value)
                        .join(" · ") || "One size"}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      {formatMoney(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-cream rounded-full border border-cocoa/10">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="h-7 w-7 flex items-center justify-center hover:text-primary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="h-7 w-7 flex items-center justify-center hover:text-primary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 p-6 border-t-2 border-cocoa/10 bg-cream space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl text-cocoa">{formatMoney(subtotal, currency)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping &amp; taxes calculated at checkout.</p>
              <Button
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="w-full h-12 rounded-full font-bold text-base"
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Checkout <ExternalLink className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
              <button
                onClick={() => setOpen(false)}
                className="w-full text-sm text-muted-foreground hover:text-cocoa"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
