import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, List, ChevronRight, X } from "lucide-react";
import { products, categories, brands } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { MobileFilters } from "@/components/mobile-filters";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
  head: () => ({ meta: [
    { title: "Shop Skincare — EtiSkin" },
    { name: "description", content: "Browse 500+ authentic, dermatologist-approved skincare products. Filter by category, brand, skin type, and price." },
    { property: "og:title", content: "Shop Skincare — EtiSkin" },
  ]}),
});

const skinTypes = ["All", "Oily", "Dry", "Combination", "Sensitive", "Normal"];

function ShopPage() {
  const [cat, setCat] = useState("all");
  const [skin, setSkin] = useState("All");
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("bestselling");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (cat === "all" || p.category === cat) &&
      (skin === "All" || p.skinType.includes(skin) || p.skinType.includes("All")) &&
      (selBrands.length === 0 || selBrands.includes(p.brand))
    );
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, skin, selBrands, sort]);

  const toggleBrand = (b: string) => setSelBrands(s => s.includes(b) ? s.filter(x => x !== b) : [...s, b]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <div className="mb-8">
        <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Shop</span>
        </nav>
        <div className="eyebrow mb-2">All Products</div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold">Shop Skincare</h1>
          <div className="flex flex-wrap gap-2">
            {(cat !== "all" || skin !== "All" || selBrands.length > 0) && (
              <>
                {cat !== "all" && <Chip label={categories.find(c => c.slug === cat)?.name || ""} onClear={() => setCat("all")} />}
                {skin !== "All" && <Chip label={skin} onClear={() => setSkin("All")} />}
                {selBrands.map(b => <Chip key={b} label={b} onClear={() => toggleBrand(b)} />)}
                <button onClick={() => { setCat("all"); setSkin("All"); setSelBrands([]); }} className="text-xs text-primary font-semibold underline">Clear all</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block space-y-8">
          <Filter title="Category">
            <ul className="space-y-1.5 text-sm">
              <li><FilterBtn active={cat === "all"} onClick={() => setCat("all")}>All</FilterBtn></li>
              {categories.map(c => <li key={c.slug}><FilterBtn active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</FilterBtn></li>)}
            </ul>
          </Filter>
          <Filter title="Skin Type">
            <div className="flex flex-wrap gap-2">
              {skinTypes.map(s => (
                <button key={s} onClick={() => setSkin(s)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${skin === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                  {s}
                </button>
              ))}
            </div>
          </Filter>
          <Filter title="Brand">
            <ul className="space-y-2 text-sm">
              {brands.map(b => (
                <li key={b}><label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-primary" />
                  <span>{b}</span>
                </label></li>
              ))}
            </ul>
          </Filter>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
            <div className="text-sm text-muted-foreground flex items-center gap-3">
              <span>{filtered.length} products</span>
              <div className="flex gap-1">
                <button onClick={() => setView("grid")} className={`p-1.5 rounded ${view === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}><Grid3x3 className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} className={`p-1.5 rounded ${view === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
            <label className="text-sm flex items-center gap-2">
              <span className="text-muted-foreground">Sort by</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="border border-border rounded-md px-2 py-1.5 bg-background text-sm">
                <option value="bestselling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4"}>
              {filtered.map(p => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Filter({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="eyebrow mb-3">{title}</h3>{children}</div>;
}
function FilterBtn({ active, onClick, children }: any) {
  return <button onClick={onClick} className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}>{children}</button>;
}
function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs px-2.5 py-1 rounded-md font-medium">
    {label}<button onClick={onClear}><X className="h-3 w-3" /></button>
  </span>;
}