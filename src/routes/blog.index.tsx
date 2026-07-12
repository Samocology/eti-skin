import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/lib/data";
import { Calendar, User, ArrowRight, Search, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({ meta: [
    { title: "The EtiSkin Journal — Skincare Advice & Guides" },
    { name: "description", content: "Dermatologist-approved articles on skincare routines, ingredients, sun care, and treatments for Nigerian skin." },
    { property: "og:title", content: "The EtiSkin Journal" },
  ]}),
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [isCatOpen, setIsCatOpen] = useState(false);

  const categories = useMemo(() => ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))], []);
  const filtered = useMemo(() => blogPosts.filter(p =>
    (cat === "All" || p.category === cat) &&
    (q === "" || (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      {/* Compact hero */}
      <section className="bg-gradient-hero text-white py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8 text-center">
          <div className="eyebrow text-gold mb-2">The Journal</div>
          <h1 className="text-3xl md:text-5xl font-serif font-semibold">Skincare, Decoded.</h1>
          <p className="mt-3 opacity-80 max-w-xl mx-auto text-sm md:text-base">
            Honest routines, ingredient deep-dives, and dermatologist-approved guides — written for Nigerian skin.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 -mt-6 relative z-10">
        <div className="bg-card border border-border rounded-xl p-3 md:p-4 shadow-soft flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background focus:outline-none text-sm"
            />
          </div>
          <div className="hidden md:flex gap-2 overflow-x-auto -mx-1 px-1">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="md:hidden relative">
            <button onClick={() => setIsCatOpen(!isCatOpen)} className="w-full flex justify-between items-center px-3 py-2.5 rounded-md bg-muted border text-sm">
              <span>{cat}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isCatOpen ? "rotate-180" : ""}`} />
            </button>
            {isCatOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-10">
                {categories.map(c => (
                  <button key={c} onClick={() => { setCat(c); setIsCatOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm ${cat === c ? "bg-muted font-semibold" : ""}`}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-12">
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No articles match your search.</div>
        )}

        {featured && (
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="block group mb-14">
            <article className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft bg-muted/40">
                <img src={featured.imageUrl} alt={featured.title} loading="eager" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">Featured</span>
              </div>
              <div>
                <span className="eyebrow">{featured.category}</span>
                <h2 className="mt-3 text-2xl md:text-4xl font-serif font-semibold group-hover:text-primary transition leading-tight">{featured.title}</h2>
                <p className="mt-4 text-foreground/80 leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-primary font-semibold text-sm">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Link>
        )}

        {rest.length > 0 && (
          <>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold">Latest Articles</h2>
              <span className="text-xs text-muted-foreground">{rest.length} article{rest.length === 1 ? "" : "s"}</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {rest.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all">
                  <div className="aspect-[4/3] overflow-hidden bg-muted/40">
                    <img src={p.imageUrl} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">{p.category}</div>
                    <h3 className="font-serif text-lg font-semibold group-hover:text-primary transition line-clamp-2">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.date}</span>
                      <span>{p.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}