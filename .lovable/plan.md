
# Sweetly & Co. — Premium Retro Candy Ecommerce (Shopify-powered)

A world-class, conversion-focused candy brand site with a **retro candy shop** aesthetic — warm reds, creams, mustard yellows, vintage badges and stickers — paired with modern ecommerce polish, smooth animations, and a powerful product page. Built on **TanStack Start + Shopify** (new dev store) with free stock candy photography.

## Setup (first step after approval)
1. Enable Shopify and create a new development store (no payments needed while building; 30-day free trial when claimed).
2. Seed the store with the 12 candy categories and a starter set of realistic products (Gummies, Sour, Fizzy, Laces, Pick & Mix, Freeze Dried, Vegan, Halal, Seasonal, Party Bundles, Gift Bundles, Wholesale Cartons).
3. Wire Storefront API for products, cart, and checkout (real Shopify checkout handoff).

## Brand & Design System
- **Palette:** cream `#FBF6EC` background, retro red `#D7263D`, mustard `#F4B41A`, candy pink `#F25CA0` accent, deep cocoa `#2A1A12` text.
- **Typography:** vintage display serif/script for headlines (e.g. Fraunces / Bagel Fat One), clean sans (Inter) for body.
- **UI:** rounded 20px cards, soft drop shadows, sticker badges ("Best Seller", "New Drop", "Vegan", "Halal"), ticket/coupon dividers, subtle paper-grain background, glossy candy product shots.
- **Motion:** floating candy parallax, hover lift, fade-on-scroll, animated marquee trust bar, confetti burst on add-to-cart, cart drawer slide-in, micro-interactions on buttons.
- Fully responsive (mobile / tablet / desktop), sticky mobile add-to-cart, bottom-sheet filters on mobile.

## Global Elements (every page)
- **Sticky header**: logo, mega menu (Shop by Category / Dietary / Bundles / Seasonal with featured imagery), search, wishlist, account, cart icon with live count.
- **Cart drawer**: line items, qty controls, coupon box, free-shipping progress bar, upsell row ("Customers also added"), checkout CTA → Shopify checkout.
- **Mobile menu**: full-screen overlay with collapsible sections.
- **Newsletter popup**: 10% off first order, shows once per session.
- **Footer**: 4-column links, payment icons, social, contact, trust badges.
- **Cookie banner**, **floating live-chat button**, **back-to-top**.

## Page 1 — Homepage (`/`)
- Hero: "Unwrap Happiness in Every Bite" + dual CTAs, floating animated candy visuals, retro starburst accents.
- Animated marquee trust bar (Free Shipping £25+ · Halal Certified · Vegan · Fast UK Delivery · Loved by 50,000+).
- 6-tile featured categories grid with hover tilt.
- Best Sellers carousel (real Shopify products) with quick-view + add-to-cart.
- "Why Choose Us" — 3 icon columns.
- **Build Your Bundle** interactive preview (drag candy into a jar mockup → CTA to full builder).
- Seasonal banner carousel (Birthday, Halloween, Movie Night, Eid, Christmas).
- Wholesale CTA strip → `/wholesale`.
- TikTok/Instagram UGC gallery grid.
- Sliding testimonial cards with star ratings.
- Newsletter signup section.

## Page 2 — Shop / Collection (`/shop`, dynamic `/shop/$collection`)
- Category banner with breadcrumb.
- Sidebar filters: price slider, type, flavor, dietary (Vegan/Halal/Gluten Free), badges, seasonal — sticky on desktop, bottom-sheet on mobile.
- Top sort bar (Featured / Price / Best Rated / Newest), result count, grid/list toggle.
- 4/2/1 column responsive product grid; cards with image hover swap, quick-add, wishlist heart, sticker badges, star rating.
- Mid-page promo banner ("Mix 3 Bundles & Save 20%").
- Infinite scroll with skeleton loaders.
- SEO content block at bottom.

## Page 3 — Product Page (`/products/$handle`) — flagship
- Sticky gallery: main image + thumbnails, hover zoom, lifestyle shot.
- Title, 4.9★ (2,348 reviews), price + compare-at + save badge.
- Persuasive short copy.
- Variant selectors (Size: Small/Medium/Mega; Flavor: Mixed/Sour/Fruity), qty stepper.
- Primary actions: Add to Cart (confetti), Buy Now (express checkout), Gift This Product (modal with message + send date).
- **Subscription option** (Monthly Sweet Box, Save 15%).
- Trust badge row (Fresh Packed / Fast Dispatch / Secure / Halal).
- Delivery note ("Ships in 24h") + urgency ("Only 12 left today").
- Expandable tabs: Description / Ingredients / Nutrition / Shipping / FAQ.
- **Frequently bought together** bundle upsell (3 products, total price, "Add all").
- Lifestyle image strip.
- Reviews section with photo reviews, rating breakdown bars, filter by stars.
- Product FAQ accordion.
- Recently viewed carousel.
- Mobile sticky add-to-cart bar.

## Page 4 — About / Our Story (`/about`)
- Hero "Our Story Starts With Joy" with vintage photo collage.
- Brand origin narrative, family recipe roots, mission, sourcing, packing standards, inclusivity sections with alternating image/text.
- Animated timeline (2018 → 2026).
- 4 brand value cards (Joy / Quality / Innovation / Community).
- Factory & packing visuals gallery.
- Founder message with signature.
- Press logos strip.
- CTA: Join Our Sweet Community.

## Page 5 — Wholesale / Trade (`/wholesale`)
- Hero "Stock Candy Customers Love" + apply CTA.
- 6 benefit cards (Low MOQ, Fast Dispatch, Bulk Discounts, Exclusive SKUs, Marketing Support, Trending Products).
- Wholesale categories grid (Impulse packs, Shelving cartons, Gift jars, Seasonal displays, Bulk tubs).
- 4-step "How it works" timeline.
- Case study cards (with metrics).
- **Trade signup form** (validated with Zod, submits to Shopify customer with B2B tag — server function).
- Trade FAQ accordion.

## Page 6 — Contact / Support (`/contact`)
- Hero "We're Here to Help".
- 5 support cards (Track Order / Shipping / Returns / Wholesale / Product Q's).
- Contact form (validated, server function → email + Shopify customer note).
- Business details card (address, phone, email, hours).
- Embedded map.
- FAQ accordion.
- Mini newsletter signup.

## Conversion & Trust Extras
- "Trending on TikTok" section, "50,000+ happy customers" counter, refer-a-friend block, subscription sweet club teaser, limited drop countdown timer, free-shipping progress bar in cart, abandoned-cart-friendly structure, schema.org Product markup, optimized images, analytics-ready hooks.

## Out of Scope (this build)
- Real payment processing live (test checkout via Shopify dev store; goes live after you claim the store and add a paid plan).
- Real review system (uses realistic seeded reviews; can wire Judge.me/Loox later).
- Live chat backend (UI button only; can connect Crisp/Tidio later).
