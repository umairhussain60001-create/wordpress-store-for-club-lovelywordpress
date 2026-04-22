import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("sweetly-newsletter-seen");
    if (seen) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("sweetly-newsletter-seen", "1");
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-cocoa/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="relative max-w-md w-full bg-cream rounded-3xl overflow-hidden border-4 border-mustard candy-card">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-cream/80 flex items-center justify-center hover:bg-cocoa hover:text-cream"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="candy-gradient p-8 text-center text-white">
          <Sparkles className="h-10 w-10 mx-auto wiggle" />
          <p className="font-display text-4xl mt-2">10% OFF</p>
          <p className="text-sm opacity-90 mt-1">your first sweet order</p>
        </div>
        <div className="p-6 text-center">
          {submitted ? (
            <>
              <h3 className="font-display text-2xl text-cocoa">You're in! 🎉</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Check your inbox for your 10% off code.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-display text-2xl text-cocoa">Join the Sweet Club</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Early drops, exclusive flavours, and a treat on us.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email) return;
                  setSubmitted(true);
                  setTimeout(() => setOpen(false), 2000);
                }}
                className="mt-4 space-y-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 rounded-full border-2 border-cocoa/10 bg-card focus:outline-none focus:border-primary"
                />
                <Button type="submit" className="w-full h-12 rounded-full font-bold">
                  Get My 10% Off
                </Button>
              </form>
              <p className="text-[10px] text-muted-foreground mt-3">
                No spam, unsubscribe anytime. By subscribing you agree to our terms.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
