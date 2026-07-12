import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.18_0.04_300)] text-[oklch(0.9_0.02_90)] mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-serif mb-4">
            <span className="text-2xl font-semibold">ETI</span>
            <span className="h-6 w-px bg-gold" />
            <span className="text-2xl font-semibold text-gold">SKIN</span>
          </div>
          <p className="text-sm opacity-70 mb-6">
            Your trusted destination for authentic, dermatologist-approved skincare products.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-gold-foreground hover:border-gold transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Shop" links={[
          { to: "/shop", label: "Face Care" },
          { to: "/shop", label: "Body Care" },
          { to: "/shop", label: "Acne Treatment" },
          { to: "/shop", label: "Serums" },
          { to: "/shop", label: "Sunscreens" },
        ]} />
        <FooterCol title="Account" links={[
          { to: "/account", label: "My Orders" },
          { to: "/account", label: "Wishlist" },
          { to: "/account", label: "Wallet" },
          { to: "/account", label: "Rewards" },
          { to: "/account", label: "Track Order" },
        ]} />
        <FooterCol title="Info" links={[
          { to: "/about", label: "About Us" },
          { to: "/blog", label: "Blog" },
          { to: "/contact", label: "Privacy Policy" },
          { to: "/contact", label: "Terms & Conditions" },
          { to: "/contact", label: "Contact Us" },
        ]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 flex flex-wrap justify-between items-center gap-4 text-xs opacity-70">
          <span>© 2026 EtiSkin. All rights reserved.</span>
          <div className="flex gap-2">
            {["Visa", "Mastercard", "Paystack", "Flutterwave"].map(p => (
              <span key={p} className="px-2 py-1 border border-white/15 rounded text-[10px]">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm opacity-80">
        {links.map((l, i) => <li key={i}><Link to={l.to} className="hover:text-gold transition">{l.label}</Link></li>)}
      </ul>
    </div>
  );
}
