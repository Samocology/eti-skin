import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

const mobileNav = nav.filter(n => n.label !== "Home" && n.label !== "Shop");

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-serif">
          <span className="text-2xl font-semibold text-primary">ETI</span>
          <span className="h-6 w-px bg-gold" />
          <span className="text-2xl font-semibold text-gold tracking-wide">SKIN</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map(n => (
            <Link key={n.to} to={n.to} activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: n.to === "/" }} className="text-foreground/80 hover:text-primary transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:text-primary transition" aria-label="Search"><Search className="h-5 w-5" /></button>
          <Link to="/account" className="p-2 hover:text-primary transition hidden sm:block" aria-label="Wishlist"><Heart className="h-5 w-5" /></Link>
          <Link to="/cart" className="p-2 hover:text-primary transition relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">{count}</span>}
          </Link>
          <Link to="/auth" className="p-2 hover:text-primary transition hidden sm:block" aria-label="Account"><User className="h-5 w-5" /></Link>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col p-4 gap-3">
            {mobileNav.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="text-sm py-2 border-b border-border/50">{n.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}