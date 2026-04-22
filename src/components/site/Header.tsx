import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, Search, Heart, User, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { CartDrawer } from "./CartDrawer";

const megaMenu = {
  "Shop by Category": [
    { label: "Gummies", href: "/shop/gummies" },
    { label: "Sour Candy", href: "/shop/sour" },
    { label: "Fizzy Candy", href: "/shop/fizzy" },
    { label: "Laces", href: "/shop/laces" },
    { label: "Pick & Mix", href: "/shop/pick-mix" },
    { label: "Freeze Dried", href: "/shop/freeze-dried" },
  ],
  Dietary: [
    { label: "Vegan Sweets", href: "/shop/vegan" },
    { label: "Halal Sweets", href: "/shop/halal" },
    { label: "Gluten Free", href: "/shop/gluten-free" },
  ],
  Bundles: [
    { label: "Party Bundles", href: "/shop/party" },
    { label: "Gift Bundles", href: "/shop/gift" },
    { label: "Movie Night", href: "/shop/movie-night" },
    { label: "Build Your Own", href: "/shop/build-your-own" },
  ],
  Seasonal: [
    { label: "Birthday", href: "/shop/birthday" },
    { label: "Halloween", href: "/shop/halloween" },
    { label: "Eid", href: "/shop/eid" },
    { label: "Christmas", href: "/shop/christmas" },
  ],
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const setCartOpen = useCartStore((s) => s.setOpen);
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-cocoa text-cream text-xs sm:text-sm py-2 px-4 text-center font-medium">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-mustard" />
          Free UK shipping over £25 · Use code SWEET10 for 10% off your first order
          <Sparkles className="h-3.5 w-3.5 text-mustard" />
        </span>
      </div>

      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b-2 border-cocoa/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-cream p-0">
                <div className="p-6 border-b-2 border-cocoa/10">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-2xl text-primary">
                    Sweetly &amp; Co.
                  </Link>
                </div>
                <nav className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-100px)]">
                  {Object.entries(megaMenu).map(([title, items]) => (
                    <div key={title}>
                      <h4 className="font-display text-lg text-cocoa mb-3">{title}</h4>
                      <ul className="space-y-2 pl-2">
                        {items.map((item) => (
                          <li key={item.href}>
                            <Link
                              to="/shop"
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-cocoa/80 hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="pt-4 border-t-2 border-cocoa/10 space-y-3">
                    <Link to="/about" onClick={() => setMobileOpen(false)} className="block font-medium">About</Link>
                    <Link to="/wholesale" onClick={() => setMobileOpen(false)} className="block font-medium">Wholesale</Link>
                    <Link to="/contact" onClick={() => setMobileOpen(false)} className="block font-medium">Contact</Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="font-display text-2xl lg:text-3xl text-primary leading-none whitespace-nowrap">
              Sweetly <span className="text-mustard">&amp;</span> Co.
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
              <button
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                className="relative font-medium text-cocoa hover:text-primary inline-flex items-center gap-1 py-2"
              >
                Shop <ChevronDown className="h-4 w-4" />
                {megaOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-cream border-2 border-cocoa/10 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 text-left animate-pop-in">
                    {Object.entries(megaMenu).map(([title, items]) => (
                      <div key={title}>
                        <h4 className="font-display text-base text-primary mb-3">{title}</h4>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item.href}>
                              <Link to="/shop" className="text-sm text-cocoa/80 hover:text-primary">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </button>
              <Link to="/shop" className="font-medium text-cocoa hover:text-primary">Bestsellers</Link>
              <Link to="/about" className="font-medium text-cocoa hover:text-primary">Our Story</Link>
              <Link to="/wholesale" className="font-medium text-cocoa hover:text-primary">Wholesale</Link>
              <Link to="/contact" className="font-medium text-cocoa hover:text-primary">Contact</Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
              <Link to="/wishlist" aria-label="Wishlist" className="hidden sm:block">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-candy-pink text-white text-xs rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(true)}
                className="relative"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center font-bold animate-pop-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-pop-in">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  autoFocus
                  placeholder="Search for sweets, bundles, flavours..."
                  className="pl-11 pr-10 h-12 rounded-full bg-card border-2 border-cocoa/10 focus-visible:border-primary"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
