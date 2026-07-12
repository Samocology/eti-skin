import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { products as seed, formatN, categories, type Product } from "@/lib/data";
import { Plus, Search, Edit3, Trash2, X, Upload, ImageIcon, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({ component: AdminProducts });

function AdminProducts() {
  const [list, setList] = useState<Product[]>(seed);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = list.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase())
  );

  const del = (slug: string) => {
    setList(l => l.filter(p => p.slug !== slug));
    toast.success("Product deleted");
  };
  const save = (p: Product) => {
    setList(l => l.some(x => x.slug === p.slug) ? l.map(x => x.slug === p.slug ? p : x) : [p, ...l]);
    setEditing(null); setShowNew(false);
    toast.success("Product saved");
  };

  const stats = [
    { label: "Total Products", value: list.length },
    { label: "In Stock", value: list.filter(p => p.stock > 0).length },
    { label: "Low Stock", value: list.filter(p => p.stock > 0 && p.stock <= 10).length },
    { label: "Out of Stock", value: list.filter(p => p.stock === 0).length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your product catalog, images and stock</p>
        </div>
        <button onClick={() => setShowNew(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition shadow-soft">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-background rounded-xl border border-border p-4">
            <div className="text-2xl font-semibold tabular-nums">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products…" className="w-full pl-10 pr-3 py-2 rounded-md bg-muted border border-transparent focus:bg-background focus:border-primary focus:outline-none text-sm" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="text-xs uppercase text-muted-foreground bg-muted/40">
              <tr>{["Product", "Category", "Price", "Stock", "Rating", ""].map(h => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.slug} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.imageUrl} alt={p.name} className="h-12 w-12 rounded-md object-cover shrink-0 bg-muted/40 border border-border" loading="lazy" />
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.brand} · {p.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.category.replace("-", " ")}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{formatN(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${p.stock > 50 ? "bg-success/15 text-success" : p.stock > 10 ? "bg-gold/20 text-gold-foreground" : "bg-destructive/15 text-destructive"}`}>
                      {p.stock} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs"><Star className="h-3 w-3 fill-gold text-gold" />{p.rating}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => setEditing(p)} className="p-2 hover:bg-muted rounded" aria-label="Edit"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => del(p.slug)} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || showNew) && (
        <ProductModal
          product={editing}
          onClose={() => { setEditing(null); setShowNew(false); }}
          onSave={save}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const [form, setForm] = useState<Product>(product ?? {
    slug: "new-product-" + Date.now(), name: "", brand: "EtiSkin", category: "face-care",
    price: 0, rating: 5, reviews: 0, skinType: ["All"], description: "",
    ingredients: [], howToUse: "", size: "50ml", stock: 0,
    image: "from-purple-200 via-white to-amber-100",
    imageUrl: "",
    images: [],
  });
  const [ingredientsText, setIngredientsText] = useState((product?.ingredients ?? []).join(", "));
  const fileRef = useRef<HTMLInputElement>(null);

  const gallery = form.images && form.images.length > 0
    ? form.images
    : form.imageUrl ? [form.imageUrl] : [];

  const readFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = await Promise.all(Array.from(files).map(f => new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(f);
    })));
    const merged = [...(form.images ?? (form.imageUrl ? [form.imageUrl] : [])), ...arr];
    setForm({ ...form, images: merged, imageUrl: merged[0] });
  };

  const setPrimary = (i: number) => {
    if (!form.images) return;
    setForm({ ...form, imageUrl: form.images[i] });
  };
  const removeImage = (i: number) => {
    const next = (form.images ?? []).filter((_, idx) => idx !== i);
    setForm({ ...form, images: next, imageUrl: next[0] ?? "" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      ingredients: ingredientsText.split(",").map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-background rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-auto shadow-glow">
        <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
          <div>
            <h2 className="font-serif text-xl font-semibold">{product ? "Edit Product" : "New Product"}</h2>
            <p className="text-xs text-muted-foreground">Fill in the details and upload one or more images</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-6">
          {/* Images */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Product Images</span>
              <span className="text-xs text-muted-foreground">{gallery.length} image{gallery.length !== 1 && "s"}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {gallery.map((src, i) => (
                <div key={i} className={`relative aspect-square rounded-lg overflow-hidden border-2 ${form.imageUrl === src ? "border-primary" : "border-border"} bg-muted/30 group`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                    <button type="button" onClick={() => setPrimary(i)} className="p-1.5 bg-white rounded" title="Set as primary"><Star className={`h-3.5 w-3.5 ${form.imageUrl === src ? "fill-gold text-gold" : "text-foreground"}`} /></button>
                    <button type="button" onClick={() => removeImage(i)} className="p-1.5 bg-white rounded" title="Remove"><Trash2 className="h-3.5 w-3.5 text-destructive" /></button>
                  </div>
                  {form.imageUrl === src && <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">Primary</span>}
                </div>
              ))}
              <button type="button" onClick={() => fileRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition">
                <Upload className="h-5 w-5" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Upload</span>
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={e => readFiles(e.target.files)} />
            <div className="mt-3">
              <label className="block">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5"><ImageIcon className="h-3 w-3" /> Or paste an image URL</span>
                <div className="mt-1 flex gap-2">
                  <input type="url" placeholder="https://…"
                    className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const v = (e.currentTarget.value ?? "").trim();
                        if (!v) return;
                        const next = [...(form.images ?? (form.imageUrl ? [form.imageUrl] : [])), v];
                        setForm({ ...form, images: next, imageUrl: form.imageUrl || v });
                        e.currentTarget.value = "";
                      }
                    }} />
                </div>
              </label>
            </div>
          </section>

          {/* Basic info */}
          <section className="grid sm:grid-cols-2 gap-4">
            <F label="Product Name" value={form.name} onChange={v => setForm({ ...form, name: v, slug: v.toLowerCase().replace(/\s+/g, "-") })} required cls="sm:col-span-2" />
            <F label="Brand" value={form.brand} onChange={v => setForm({ ...form, brand: v })} />
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Category</span>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none">
                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </label>
            <F label="Price (₦)" type="number" value={form.price} onChange={v => setForm({ ...form, price: +v })} required />
            <F label="Compare-at Price (₦)" type="number" value={form.compareAt ?? ""} onChange={v => setForm({ ...form, compareAt: v ? +v : undefined })} />
            <F label="Stock" type="number" value={form.stock} onChange={v => setForm({ ...form, stock: +v })} />
            <F label="Size / Volume" value={form.size} onChange={v => setForm({ ...form, size: v })} />
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Badge</span>
              <select value={form.badge ?? ""} onChange={e => setForm({ ...form, badge: (e.target.value || undefined) as Product["badge"] })} className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none">
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Sale">Sale</option>
                <option value="Top Rated">Top Rated</option>
              </select>
            </label>
            <F label="Rating" type="number" value={form.rating} onChange={v => setForm({ ...form, rating: +v })} />
          </section>

          <section className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Description</span>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Ingredients <span className="text-muted-foreground normal-case text-[10px]">(comma separated)</span></span>
              <textarea value={ingredientsText} onChange={e => setIngredientsText(e.target.value)} rows={2}
                placeholder="Vitamin C, Hyaluronic Acid, Niacinamide"
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">How to Use</span>
              <textarea value={form.howToUse} onChange={e => setForm({ ...form, howToUse: e.target.value })} rows={2}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" />
            </label>
          </section>

          <div className="flex justify-end gap-2 pt-4 border-t border-border sticky bottom-0 bg-background">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted">Cancel</button>
            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function F({ label, type = "text", value, onChange, required, cls = "" }: { label: string; type?: string; value: any; onChange: (v: string) => void; required?: boolean; cls?: string }) {
  return <label className={`block ${cls}`}><span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
      className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" /></label>;
}
