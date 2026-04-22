import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Award, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Sweetly & Co." },
      { name: "description", content: "From a family kitchen to 50,000+ happy customers. The story behind the UK's most-loved halal & vegan sweet brand." },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2018", title: "Started in our kitchen", text: "A family recipe and a dream to make sweets everyone could enjoy." },
  { year: "2020", title: "Launched online", text: "Opened our first DTC store. Sold out in 48 hours." },
  { year: "2022", title: "Wholesale growth", text: "Stocked in 200+ independent shops across the UK." },
  { year: "2024", title: "Viral candy collections", text: "Our freeze-dried range hit 10M views on TikTok." },
  { year: "2026", title: "Going global", text: "Shipping to 30+ countries, with a brand-new HQ." },
];

const VALUES = [
  { icon: Heart, title: "Joy", text: "Every product is made to spark a smile." },
  { icon: Award, title: "Quality", text: "Premium ingredients, every single time." },
  { icon: Sparkles, title: "Innovation", text: "Always experimenting with new flavours and formats." },
  { icon: Users, title: "Community", text: "Sweets for everyone — halal, vegan, gluten-free." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 candy-gradient opacity-15" />
        <div className="container mx-auto px-4 py-20 lg:py-28 text-center relative">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Our Story</p>
          <h1 className="font-display text-5xl lg:text-7xl text-cocoa mt-3">Our Story Starts <br /><span className="candy-gradient-text">With Joy</span></h1>
          <p className="mt-5 text-lg text-cocoa/70 max-w-2xl mx-auto">
            Eight years ago, a family recipe in a small London kitchen turned into the UK's most-loved sweet brand. Today, we ship happiness to 50,000+ customers worldwide.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=800&q=80" className="rounded-3xl candy-card aspect-[4/5] object-cover" alt="Hand-packing sweets" />
        <div>
          <h2 className="font-display text-4xl text-cocoa">From a family kitchen to 50,000+ smiles</h2>
          <p className="mt-4 text-cocoa/80 leading-relaxed">
            It started with our grandmother's pick-and-mix tradition: every Friday, the whole family would gather to share a tin of sweets. We wanted to recreate that feeling — joy, generosity, indulgence — for everyone, regardless of dietary needs.
          </p>
          <p className="mt-3 text-cocoa/80 leading-relaxed">
            Today, we hand-pack every order in our London kitchen using premium ingredients from trusted European confectioners. Every recipe is tested by our team and our community of 50,000+ sweet-lovers.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">What we stand for</p>
          <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">Brand values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-card rounded-3xl p-6 text-center candy-card border-2 border-cocoa/5 hover-lift">
              <div className="h-14 w-14 rounded-2xl candy-gradient text-white mx-auto flex items-center justify-center">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl text-cocoa mt-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-card/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-bold">The journey</p>
            <h2 className="font-display text-4xl lg:text-5xl text-cocoa mt-2">From 2018 to today</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 candy-gradient" />
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className={`relative pl-12 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-10 ${i % 2 === 0 ? "" : "lg:[&>div:first-child]:order-2 lg:text-right"}`}>
                  <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 lg:-translate-x-1/2 top-1 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold sticker">★</div>
                  <div className={`bg-cream rounded-3xl p-6 candy-card border-2 border-cocoa/5 ${i % 2 === 0 ? "lg:mr-12" : "lg:ml-12"}`}>
                    <p className="font-display text-3xl text-primary">{t.year}</p>
                    <h3 className="font-bold text-cocoa text-lg mt-1">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.text}</p>
                  </div>
                  <div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-cocoa text-cream rounded-[2.5rem] p-10 lg:p-16 text-center max-w-3xl mx-auto">
          <p className="text-mustard font-display text-2xl">"Sweets bring people together. That's our whole mission."</p>
          <p className="mt-4 font-bold">— Layla Hussain, Founder</p>
          <div className="mt-3 font-display text-3xl text-mustard">~ Layla</div>
        </div>
      </section>

      {/* Press */}
      <section className="container mx-auto px-4 pb-16">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-5">As featured in</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60">
          {["VOGUE", "BBC", "TimeOut", "STYLIST", "Forbes", "RetailWeek"].map((p) => (
            <span key={p} className="font-display text-2xl text-cocoa">{p}</span>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 text-center">
        <Link to="/shop">
          <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold">Join Our Sweet Community</Button>
        </Link>
      </section>
    </>
  );
}
