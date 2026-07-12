import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Truck, Award, MapPin, Star, Check } from "lucide-react";
import { heroImageUrl, products, testimonials, categories, formatN } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const bestSellers = products.slice(0, 4);
  return (
    <>
      {/* HERO — reduced */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pt-4 md:pt-6">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-6 md:p-8 flex flex-col justify-center shadow-glow">
            <span className="eyebrow text-gold mb-3">Dermatologist Approved</span>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold leading-[1.05]">
              Healthy Skin<br />
              <span className="text-gold italic">Starts Here</span>
            </h1>
            <p className="mt-4 text-sm md:text-base opacity-80 max-w-md">
              Premium skincare formulated for every skin type. Authentic products, clinically proven results.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground px-5 py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-md font-medium text-sm hover:bg-white/10 transition">
                Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 pt-5 border-t border-white/15">
              {[["500+", "Products"], ["50K+", "Customers"], ["4.9★", "Rating"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-xl md:text-2xl font-serif font-semibold text-gold tabular-nums">{n}</div>
                  <div className="text-[10px] md:text-xs opacity-70 mt-0.5 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden min-h-[240px] md:min-h-[320px] shadow-soft">
            <img src={heroImageUrl} alt="Luxury skincare products" className="absolute inset-0 h-full w-full object-cover" width={1400} height={1000} loading="eager" />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-2 text-xs md:text-sm font-semibold shadow-soft">
              <Shield className="h-4 w-4 text-primary" /> 100% Authentic
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow mb-2">Collections</div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">Shop by Category</h2>
          </div>
          <Link to="/shop" className="text-sm text-primary font-semibold hover:text-gold transition flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" className="group text-center">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-border group-hover:shadow-glow transition">
                <img src={c.imageUrl} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </div>
              <div className="mt-3 text-sm font-semibold">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow mb-2">Top Picks</div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-sm text-primary font-semibold hover:text-gold transition flex items-center gap-1">
            Shop All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 mt-16">
        <div className="text-center mb-10">
          <div className="eyebrow mb-2">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
            <span className="text-gold font-bold">4.9</span>
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
            <span>from 12,000+ reviews</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-card p-6 rounded-xl border border-border shadow-soft">
              <div className="flex mb-3">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
              <p className="text-sm italic text-foreground/80 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mt-16 bg-[oklch(0.2_0.05_300)] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="eyebrow mb-2">Our Promise</div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">Why Choose EtiSkin?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              [Award, "Authentic Products", "Sourced directly from certified brands and verified."],
              [Truck, "Fast Delivery", "Same-day dispatch and express delivery across Nigeria."],
              [Check, "Dermatologist Approved", "Catalogue curated and reviewed by skin specialists."],
              [MapPin, "Nationwide Delivery", "We deliver to all 36 states and the FCT."],
            ].map(([Icon, title, desc]) => (
              <div key={title as string} className="text-center">
                <div className="h-14 w-14 mx-auto rounded-full border border-gold/40 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{title as string}</h3>
                <p className="text-sm opacity-70">{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

export function Newsletter() {
  return (
    <section className="mx-auto max-w-3xl px-4 md:px-8 mt-16 mb-16 text-center">
      <div className="eyebrow mb-2">Stay In The Loop</div>
      <h2 className="text-2xl md:text-3xl font-serif font-semibold">Join the EtiSkin Family</h2>
      <p className="mt-3 text-sm text-muted-foreground">Subscribe for exclusive deals, skincare tips, and new product launches.</p>
      <form
        onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; f.reset(); import("sonner").then(m => m.toast.success("You're subscribed! Watch your inbox.")); }}
        className="mt-6 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"
      >
        <input type="email" required placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-md bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <button className="bg-gradient-gold text-gold-foreground font-semibold px-6 py-3 rounded-md hover:opacity-90 transition text-sm">SUBSCRIBE</button>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">No spam, ever. Unsubscribe anytime.</p>
    </section>
  );
}

export const _hint = formatN;