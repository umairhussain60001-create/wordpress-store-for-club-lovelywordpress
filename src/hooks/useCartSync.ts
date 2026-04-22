import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

export function useCartSync() {
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    syncCart();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") syncCart();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [syncCart]);
}

export function useWishlistStore() {
  // Lightweight wishlist via localStorage events; consumers re-read on update.
}
