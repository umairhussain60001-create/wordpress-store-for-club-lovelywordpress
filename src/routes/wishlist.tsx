import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Retro Candy Co." },
      { name: "description", content: "Saved sweet treats you love." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);

  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh]">
      <h1 className="font-display text-5xl mb-8">Your Wishlist</h1>
      {ids.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
          <Button asChild>
            <Link to="/shop">Browse the shop</Link>
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground">{ids.length} saved item(s).</p>
      )}
    </div>
  );
}
