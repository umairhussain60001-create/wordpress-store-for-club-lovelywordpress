import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NewsletterPopup } from "@/components/site/NewsletterPopup";
import { CookieBanner } from "@/components/site/CookieBanner";
import { LiveChatButton } from "@/components/site/LiveChatButton";
import { useCartSync } from "@/hooks/useCartSync";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-8xl text-primary">404</p>
        <h1 className="mt-2 font-display text-3xl text-cocoa">Lost in the candy aisle?</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The sweets you're looking for don't exist or have been gobbled up.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:scale-105 transition-transform"
          >
            Back to the shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sweetly & Co" },
      {
        name: "description",
        content:
          "Premium halal, vegan and irresistible sweets, hand-packed fresh in the UK. Pick & Mix bundles, gummies, sour candy and gift boxes delivered to your door.",
      },
      { name: "author", content: "Sweetly & Co." },
      { property: "og:title", content: "Sweetly & Co" },
      {
        property: "og:description",
        content: "Premium halal, vegan & irresistible sweets delivered to your door.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@sweetlyco" },
      { name: "twitter:title", content: "Sweetly & Co" },
      { name: "description", content: "Premium Halal, Vegan & Pick & Mix Sweets" },
      { property: "og:description", content: "Premium Halal, Vegan & Pick & Mix Sweets" },
      { name: "twitter:description", content: "Premium Halal, Vegan & Pick & Mix Sweets" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9c02ae30-a62a-453f-bb37-eba4f67efe43" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9c02ae30-a62a-453f-bb37-eba4f67efe43" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col bg-cream text-cocoa">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <NewsletterPopup />
      <CookieBanner />
      <LiveChatButton />
      <Toaster position="top-center" richColors />
    </div>
  );
}
