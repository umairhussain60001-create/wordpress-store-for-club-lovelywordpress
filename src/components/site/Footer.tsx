import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cocoa text-cream mt-20">
      {/* Newsletter strip */}
      <div className="border-b border-cream/10">
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display text-3xl md:text-4xl text-mustard">Get 10% off your first order</h3>
            <p className="text-cream/70 mt-2">Join 50,000+ sweet lovers for early drops, exclusive discounts and recipe inspiration.</p>
          </div>
          <form className="flex gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 h-12 px-4 rounded-full bg-cream text-cocoa placeholder:text-cocoa/50 focus:outline-none focus:ring-2 focus:ring-mustard"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-full bg-mustard text-cocoa font-bold hover:scale-105 transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display text-3xl text-mustard">Sweetly &amp; Co.</Link>
          <p className="text-cream/70 mt-3 text-sm leading-relaxed">
            Premium halal, vegan & irresistible sweets, hand-packed fresh in the UK and shipped worldwide.
          </p>
          <div className="flex gap-3 mt-4">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-cream/10 hover:bg-mustard hover:text-cocoa flex items-center justify-center transition-colors" aria-label="Social link">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-mustard mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/shop">All Sweets</Link></li>
            <li><Link to="/shop">Pick &amp; Mix</Link></li>
            <li><Link to="/shop">Bundles</Link></li>
            <li><Link to="/shop">Vegan</Link></li>
            <li><Link to="/shop">Halal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-mustard mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/wholesale">Wholesale</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-mustard mb-3">Help</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hello@sweetly.co</li>
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +44 20 7946 0958</li>
            <li className="flex items-start gap-2"><MapPin className="h-3.5 w-3.5 mt-0.5" /> 12 Candy Lane, London E1</li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/60">
          <p>© 2026 Sweetly &amp; Co. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Shipping</a>
          </div>
          <div className="flex gap-2 items-center">
            {["VISA", "MC", "AMEX", "PAY", "GPay"].map((p) => (
              <span key={p} className="bg-cream text-cocoa text-[10px] font-bold px-2 py-1 rounded">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
