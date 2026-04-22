import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Truck, RotateCcw, HelpCircle, ShoppingBag, Building2, Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — Sweetly & Co." },
      { name: "description", content: "Need help with an order, ingredients, returns, or wholesale? Our candy crew is here to help." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().min(1, "Subject required").max(160),
  message: z.string().trim().min(1, "Message required").max(2000),
});

const SUPPORT = [
  { icon: Truck, title: "Track Order", text: "Check shipping status & estimated delivery." },
  { icon: HelpCircle, title: "Shipping Help", text: "UK & international shipping questions." },
  { icon: RotateCcw, title: "Returns", text: "Easy returns within 14 days." },
  { icon: Building2, title: "Wholesale", text: "Trade pricing & stockist enquiries." },
  { icon: ShoppingBag, title: "Product Questions", text: "Ingredients, allergens & recipes." },
];

const FAQ = [
  { q: "How long does shipping take?", a: "Standard UK 2–3 days. Express next day. International 5–10 days." },
  { q: "Do you ship internationally?", a: "Yes, we ship to 30+ countries worldwide." },
  { q: "Are products halal?", a: "All our products marked Halal are certified by HMC. We never use pork gelatine or alcohol." },
  { q: "Can I send as a gift?", a: "Yes — add a personal message and choose a gift wrap option at checkout." },
  { q: "How do I track my order?", a: "You'll get a tracking link by email as soon as your order ships." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    toast.success("Message sent! We'll be in touch within 24h. 🍬");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 candy-gradient opacity-15" />
        <div className="container mx-auto px-4 py-16 lg:py-24 text-center relative">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Support</p>
          <h1 className="font-display text-5xl lg:text-7xl text-cocoa mt-3">We're Here to Help</h1>
          <p className="mt-3 text-lg text-cocoa/70 max-w-xl mx-auto">Real humans, real quick replies. Average response time: 2 hours.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUPPORT.map((s) => (
            <a key={s.title} href="#contact-form" className="bg-card rounded-3xl p-5 text-center candy-card border-2 border-cocoa/5 hover-lift">
              <s.icon className="h-7 w-7 text-primary mx-auto" />
              <h3 className="font-display text-lg text-cocoa mt-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="contact-form" className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="lg:col-span-2 bg-card rounded-3xl p-8 candy-card border-2 border-cocoa/5 space-y-4">
          <h2 className="font-display text-3xl text-cocoa">Send us a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 h-11 rounded-xl" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 h-11 rounded-xl" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 h-11 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1 h-11 rounded-xl" />
              {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 rounded-2xl" />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" className="rounded-full h-12 px-8 font-bold">Send Message</Button>
        </form>

        <aside className="space-y-4">
          <div className="bg-mustard/30 rounded-3xl p-6 candy-card border-2 border-cocoa/5">
            <h3 className="font-display text-xl text-cocoa mb-3">Get in touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><Mail className="h-4 w-4 text-primary mt-0.5" /> hello@sweetly.co</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 text-primary mt-0.5" /> +44 20 7946 0958</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5" /> 12 Candy Lane, London E1 6AN</li>
              <li className="flex gap-2"><Clock className="h-4 w-4 text-primary mt-0.5" /> Mon–Fri 9am–6pm GMT</li>
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden candy-card border-2 border-cocoa/5 aspect-square">
            <iframe
              title="Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.08%2C51.50%2C-0.06%2C51.52&layer=mapnik"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <h2 className="font-display text-3xl text-cocoa text-center mb-6">Frequently asked</h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {FAQ.map((f, i) => (
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
