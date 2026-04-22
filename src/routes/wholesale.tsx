import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Truck, Tag, Boxes, Megaphone, TrendingUp, Sparkles } from "lucide-react";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale & Trade — Sweetly & Co." },
      { name: "description", content: "Stock our bestselling sweets. Low MOQ, fast UK dispatch, exclusive SKUs and full marketing support for retailers." },
    ],
  }),
  component: WholesalePage,
});

const schema = z.object({
  business: z.string().trim().min(1, "Required").max(120),
  contact: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Invalid phone").max(40),
  country: z.string().trim().min(1, "Required").max(80),
  storeType: z.string().trim().min(1, "Required").max(80),
  estimate: z.string().trim().min(1, "Required").max(80),
});

const BENEFITS = [
  { icon: Boxes, title: "Low MOQ", text: "Start from just £200 — perfect for new stockists." },
  { icon: Truck, title: "Fast Dispatch", text: "Orders ship in 48 hours from our UK warehouse." },
  { icon: Tag, title: "Bulk Discounts", text: "Up to 35% off RRP at higher volumes." },
  { icon: Sparkles, title: "Exclusive SKUs", text: "Trade-only flavours and limited drops." },
  { icon: Megaphone, title: "Marketing Support", text: "Free POS displays, social assets, training." },
  { icon: TrendingUp, title: "Trending Products", text: "Stock the viral sweets your customers ask for." },
];

function WholesalePage() {
  const [form, setForm] = useState({ business: "", contact: "", email: "", phone: "", country: "United Kingdom", storeType: "Retail", estimate: "£500–1,000" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Application received! Our trade team will be in touch within 24h.");
  };

  return (
    <>
      <section className="relative overflow-hidden bg-cocoa text-cream">
        <div className="absolute inset-0 candy-gradient opacity-20" />
        <div className="container mx-auto px-4 py-20 lg:py-28 text-center relative">
          <p className="text-xs uppercase tracking-widest text-mustard font-bold">Wholesale &amp; Trade</p>
          <h1 className="font-display text-5xl lg:text-7xl text-mustard mt-3">Stock Candy <br /> Customers Love</h1>
          <p className="mt-4 text-lg text-cream/80 max-w-2xl mx-auto">
            Retailers, stores, events and resellers — get premium trade pricing on the UK's most-loved sweet brand.
          </p>
          <a href="#apply">
            <Button size="lg" className="mt-6 rounded-full h-14 px-10 bg-mustard text-cocoa hover:bg-mustard/80 font-bold">
              Apply for a Trade Account
            </Button>
          </a>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-card rounded-3xl p-6 candy-card border-2 border-cocoa/5 hover-lift">
              <div className="h-12 w-12 rounded-2xl candy-gradient text-white flex items-center justify-center">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl text-cocoa mt-3">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-3xl lg:text-4xl text-cocoa text-center mb-8">Wholesale categories</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {["Impulse packs", "Shelving cartons", "Gift jars", "Seasonal displays", "Bulk tubs"].map((c) => (
            <div key={c} className="bg-mustard/20 rounded-2xl aspect-square flex items-center justify-center text-center p-4 hover-lift candy-card">
              <p className="font-display text-lg text-cocoa">{c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl text-cocoa text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-4 gap-5">
            {["Apply", "Get Approved", "Order Trade Pricing", "Grow Sales"].map((s, i) => (
              <div key={s} className="bg-cream rounded-3xl p-6 text-center candy-card border-2 border-cocoa/5">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center font-display text-xl">{i + 1}</div>
                <p className="font-display text-xl text-cocoa mt-3">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="apply" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 lg:p-10 candy-card border-2 border-cocoa/5">
          <h2 className="font-display text-3xl text-cocoa text-center">Apply for a trade account</h2>
          <p className="text-sm text-muted-foreground text-center mt-1">Approved within 24 hours.</p>

          {submitted ? (
            <div className="mt-8 text-center py-10">
              <p className="text-6xl mb-3">🎉</p>
              <h3 className="font-display text-2xl text-cocoa">Application received!</h3>
              <p className="text-sm text-muted-foreground mt-2">We'll email you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { id: "business", label: "Business name" },
                { id: "contact", label: "Contact name" },
                { id: "email", label: "Email", type: "email" },
                { id: "phone", label: "Phone" },
                { id: "country", label: "Country" },
                { id: "storeType", label: "Store type" },
              ].map((f) => (
                <div key={f.id}>
                  <Label htmlFor={f.id}>{f.label}</Label>
                  <Input
                    id={f.id}
                    type={f.type ?? "text"}
                    value={(form as any)[f.id]}
                    onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    className="mt-1 h-11 rounded-xl"
                  />
                  {errors[f.id] && <p className="text-xs text-destructive mt-1">{errors[f.id]}</p>}
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label htmlFor="estimate">Monthly order estimate</Label>
                <select
                  id="estimate"
                  value={form.estimate}
                  onChange={(e) => setForm({ ...form, estimate: e.target.value })}
                  className="mt-1 h-11 w-full rounded-xl border border-cocoa/15 bg-card px-3"
                >
                  {["£200–500", "£500–1,000", "£1,000–5,000", "£5,000+"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <Button type="submit" className="sm:col-span-2 rounded-full h-12 font-bold mt-2">
                Apply for Wholesale Account
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="font-display text-3xl text-cocoa text-center mb-6">Trade FAQ</h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {[
              { q: "What's the minimum order?", a: "Our trade MOQ is £200 (approx. 30–40 units depending on selection)." },
              { q: "How fast is delivery?", a: "We dispatch within 48 hours. UK delivery 2–4 days, EU 5–7 days." },
              { q: "Do you offer private label?", a: "Yes — for orders above £5,000/month we can offer custom branding and packaging." },
            ].map((f, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="font-display text-lg text-cocoa">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-cocoa/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
