import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Sparkles, Award, Heart, ArrowRight, Quote } from "lucide-react";
import { heroImageUrl } from "@/lib/data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [
    { title: "About EtiSkin — Skincare Built on Trust & Science" },
    { name: "description", content: "EtiSkin was born from frustration — the inability to find genuine, effective skincare in Nigeria. Meet the founder and the mission behind the brand." },
    { property: "og:title", content: "About EtiSkin" },
  ]}),
});

function AboutPage() {
  return (
    <>
      {/* Compact hero */}
      <section className="bg-gradient-hero text-white py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="eyebrow text-gold mb-3">Our Story</div>
          <h1 className="text-3xl md:text-5xl font-serif font-semibold leading-tight max-w-3xl">
            Skincare Built on<br /><span className="text-gold italic">Trust & Science</span>
          </h1>
          <p className="mt-4 text-sm md:text-base opacity-80 max-w-2xl">
            EtiSkin was born from a simple frustration — the inability to find genuine, effective skincare products in Nigeria without second-guessing their authenticity.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[oklch(0.22_0.06_300)] text-white py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["500+", "Products"], ["50K+", "Happy Customers"], ["36", "States Served"], ["4.9★", "Avg Rating"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl md:text-4xl font-serif text-gold font-semibold tabular-nums">{n}</div>
              <div className="text-[10px] md:text-xs opacity-70 mt-1 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="eyebrow mb-2">Our Mission</div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">Making Great Skin Accessible to Everyone</h2>
          <p className="mt-5 text-foreground/80 leading-relaxed">
            At EtiSkin, we believe every Nigerian deserves access to skincare that truly works. We partner exclusively with certified brands and authorized distributors to guarantee authenticity — no counterfeits, no compromises.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Every product on our platform is reviewed against clinical evidence and real-world results, ensuring that what you put on your skin is safe, effective, and worth every naira you spend.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md font-semibold text-sm">
              Shop Our Collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-md font-semibold hover:bg-muted text-sm">
              Get In Touch
            </Link>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft order-1 md:order-2">
          <img src={heroImageUrl} alt="EtiSkin studio" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2 text-xs md:text-sm font-semibold flex items-center gap-2 shadow-soft">
            <Shield className="h-4 w-4 text-primary" /> Dermatologist Verified
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="eyebrow mb-2">What We Stand For</div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              [Shield, "100% Authentic", "Every product passes rigorous verification before reaching your door."],
              [Sparkles, "Clean Formulas", "We only carry products free from unnecessary irritants."],
              [Award, "Dermatologist Approved", "Curated with guidance from trained skin specialists."],
              [Heart, "For Every Skin", "Whether oily, dry, sensitive, or combination — we have something for you."],
            ].map(([I, t, d]) => (
              <div key={t as string} className="bg-card p-6 rounded-xl border border-border">
                <div className="h-11 w-11 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-4">
                  <I className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{t as string}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story — replaces "Meet the Team" */}
      <section className="bg-[oklch(0.2_0.05_300)] text-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">Founder Note</div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">A Letter from Adaeze</h2>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-start">
            <div className="mx-auto md:mx-0 text-center md:text-left">
              <div className="h-40 w-40 md:h-52 md:w-52 rounded-full bg-gradient-to-br from-amber-200 to-purple-300 flex items-center justify-center font-serif text-6xl md:text-7xl text-primary shadow-glow mx-auto">
                A
              </div>
              <div className="mt-4">
                <div className="font-serif text-lg font-semibold">Adaeze Okafor</div>
                <div className="text-xs opacity-70 uppercase tracking-wider">Founder</div>
              </div>
            </div>

            <div className="relative text-center md:text-left">
              <Quote className="h-10 w-10 text-gold/40 absolute -top-2 -left-1 hidden md:block" />
              <div className="md:pl-10 text-white/90 leading-relaxed space-y-4">
                <p>
                  EtiSkin started in my apartment in Lagos after months of buying "premium" skincare that turned out to be counterfeit. I was tired — tired of paying for lies, tired of watching friends give up on their skin, tired of hearing "just live with it."
                </p>
                <p>
                  I built EtiSkin as a one-woman promise: every product you buy here is real, sourced directly from certified brands, and reviewed against actual clinical evidence. There is no team of PR people to hide behind — just me, my dermatology consultants, and a growing community of customers who trust that we mean what we say.
                </p>
                <p>
                  Thank you for being here. Your skin deserves the truth, and I'm honoured to be part of the journey.
                </p>
                <p className="font-serif text-2xl text-gold italic">— Adaeze</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="eyebrow mb-2">How We Got Here</div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold">Our Journey</h2>
        </div>
        <div className="space-y-5">
          {[
            ["2019", "EtiSkin founded with just 12 products and a mission to make authentic skincare accessible."],
            ["2020", "Reached 5,000 customers. Launched dermatologist consultation service."],
            ["2021", "Expanded to all 36 Nigerian states. Crossed ₦100M in sales."],
            ["2023", "Launched the EtiSkin private label. Over 500 SKUs and 50,000 happy customers."],
            ["2025", "Expanding to Ghana, Kenya, and South Africa. The journey continues."],
          ].map(([y, t], i, arr) => (
            <div key={y} className="grid grid-cols-[64px_16px_1fr] gap-4 items-start">
              <div className="text-right text-xl md:text-2xl font-serif font-semibold text-gold tabular-nums">{y}</div>
              <div className="relative flex justify-center pt-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {i < arr.length - 1 && <div className="absolute top-5 w-px h-full bg-border" />}
              </div>
              <div className="bg-card border border-border rounded-lg p-4 shadow-soft text-sm">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-14">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold">Ready for Better Skin?</h3>
            <p className="mt-2 opacity-80 text-sm">Explore over 500 authentic skincare products, handpicked for Nigerian skin.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/shop" className="bg-gradient-gold text-gold-foreground font-semibold px-5 py-2.5 rounded-md text-sm">Shop Now</Link>
            <Link to="/contact" className="border border-white/40 px-5 py-2.5 rounded-md font-semibold text-sm">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}