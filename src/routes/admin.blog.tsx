import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { blogPosts as seed, type BlogPost } from "@/lib/data";
import { Plus, Edit3, Trash2, X, Eye, FileText, Layout, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/blog")({ component: AdminBlog });

const tabs = [
  { id: "posts", label: "Blog Posts", icon: FileText },
  { id: "banners", label: "Homepage Banners", icon: Layout },
] as const;

function AdminBlog() {
  const [tab, setTab] = useState<typeof tabs[number]["id"]>("posts");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Blog & Content</h1>
        <p className="text-sm text-muted-foreground">Manage articles and homepage banners</p>
      </div>
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            <t.icon className="h-4 w-4" />{t.label}
          </button>
        ))}
      </div>
      {tab === "posts" && <Posts />}
      {tab === "banners" && <Banners />}
    </div>
  );
}

function Posts() {
  const [list, setList] = useState<BlogPost[]>(seed);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showNew, setShowNew] = useState(false);

  const save = (p: BlogPost) => {
    setList(l => l.some(x => x.slug === p.slug) ? l.map(x => x.slug === p.slug ? p : x) : [p, ...l]);
    setEditing(null); setShowNew(false); toast.success("Post saved");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{list.length} published articles</div>
        <button onClick={() => setShowNew(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 shadow-soft">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {list.map(p => (
          <div key={p.slug} className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-soft transition">
            <div className="aspect-[16/9] bg-muted overflow-hidden">
              <img src={p.imageUrl} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold">{p.category}</div>
              <h3 className="font-serif text-lg font-semibold mt-1 line-clamp-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{p.author} · {p.date}</div>
                <div className="flex gap-1">
                  <a href={`/blog/${p.slug}`} target="_blank" className="p-2 hover:bg-muted rounded" title="View"><Eye className="h-4 w-4" /></a>
                  <button onClick={() => setEditing(p)} className="p-2 hover:bg-muted rounded" title="Edit"><Edit3 className="h-4 w-4" /></button>
                  <button onClick={() => { setList(l => l.filter(x => x.slug !== p.slug)); toast.success("Deleted"); }} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(editing || showNew) && <PostModal post={editing} onClose={() => { setEditing(null); setShowNew(false); }} onSave={save} />}
    </>
  );
}

const CATEGORIES = ["Routines", "Ingredients", "Concerns", "Trends", "Tips"];

function PostModal({ post, onClose, onSave }: { post: BlogPost | null; onClose: () => void; onSave: (p: BlogPost) => void }) {
  const [form, setForm] = useState<BlogPost>(post ?? {
    slug: "new-post-" + Date.now(), title: "", excerpt: "", content: "",
    author: "EtiSkin Team", date: new Date().toISOString().slice(0, 10),
    category: "Routines", readTime: "5 min read",
    imageUrl: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setForm({ ...form, imageUrl: r.result as string });
    r.readAsDataURL(f);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-background rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-auto shadow-glow">
        <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
          <div>
            <h2 className="font-serif text-xl font-semibold">{post ? "Edit Post" : "New Blog Post"}</h2>
            <p className="text-xs text-muted-foreground">Publish a new article for your customers</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="p-6 space-y-5">
          {/* Cover image */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider">Cover Image</span>
            <div className="mt-1 relative aspect-[16/9] rounded-xl overflow-hidden border-2 border-dashed border-border bg-muted/40 flex items-center justify-center">
              {form.imageUrl ? (
                <>
                  <img src={form.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, imageUrl: "" })} className="absolute top-2 right-2 p-1.5 bg-white rounded-md shadow"><X className="h-4 w-4" /></button>
                </>
              ) : (
                <button type="button" onClick={() => fileRef.current?.click()} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                  <Upload className="h-6 w-6" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Upload cover</span>
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => onFile(e.target.files?.[0])} />
            <label className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
              <ImageIcon className="h-3 w-3" />
              <input type="url" placeholder="…or paste an image URL" value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                className="flex-1 px-2 py-1 rounded bg-background border border-border text-xs" />
            </label>
          </div>

          <F label="Title" value={form.title} onChange={v => setForm({ ...form, title: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })} required />
          <div className="grid sm:grid-cols-3 gap-4">
            <F label="Author" value={form.author} onChange={v => setForm({ ...form, author: v })} />
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider">Category</span>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <F label="Read time" value={form.readTime} onChange={v => setForm({ ...form, readTime: v })} />
          </div>
          <label className="block"><span className="text-xs font-semibold uppercase tracking-wider">Excerpt</span>
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2}
              placeholder="A short teaser shown on the blog list…"
              className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" /></label>
          <label className="block"><span className="text-xs font-semibold uppercase tracking-wider">Content</span>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8}
              placeholder="Write your article here. Markdown-friendly."
              className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border font-mono text-sm focus:ring-2 focus:ring-primary focus:outline-none" /></label>
          <div className="flex justify-end gap-2 pt-4 border-t border-border sticky bottom-0 bg-background">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted">Cancel</button>
            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90">Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

type Banner = { id: string; title: string; subtitle: string; cta: string; imageUrl: string; location: string; active: boolean };

function Banners() {
  const [list, setList] = useState<Banner[]>([
    { id: "b1", title: "Healthy Skin Starts Here", subtitle: "Dermatologist approved skincare", cta: "Shop Now", location: "Homepage Hero", active: true, imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=70" },
    { id: "b2", title: "SPF Season — 20% Off", subtitle: "Protect your glow this summer", cta: "Shop SPF", location: "Shop Banner", active: false, imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=70" },
    { id: "b3", title: "New Arrivals Weekly", subtitle: "Fresh formulations, always in stock", cta: "See What's New", location: "Category Page", active: true, imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=70" },
  ]);
  const [editing, setEditing] = useState<Banner | null>(null);

  const save = (b: Banner) => {
    setList(l => l.map(x => x.id === b.id ? b : x));
    setEditing(null);
    toast.success("Banner updated");
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {list.map(b => (
          <div key={b.id} className="bg-background rounded-xl border border-border overflow-hidden">
            <div className="relative aspect-[16/7] bg-muted">
              <img src={b.imageUrl} alt={b.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                <div className="text-[10px] uppercase tracking-widest text-gold font-bold">{b.location}</div>
                <div className="font-serif text-lg font-semibold">{b.title}</div>
                <div className="text-xs opacity-80">{b.subtitle}</div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-semibold">{b.active ? "Live" : "Paused"}</span>
                <input type="checkbox" checked={b.active} onChange={e => setList(l => l.map(x => x.id === b.id ? { ...x, active: e.target.checked } : x))} className="peer sr-only" />
                <div className="w-10 h-6 bg-muted rounded-full peer-checked:bg-primary transition relative">
                  <div className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition ${b.active ? "translate-x-4" : ""}`} />
                </div>
              </label>
              <button onClick={() => setEditing(b)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                <Edit3 className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {editing && <BannerModal banner={editing} onClose={() => setEditing(null)} onSave={save} />}
    </>
  );
}

function BannerModal({ banner, onClose, onSave }: { banner: Banner; onClose: () => void; onSave: (b: Banner) => void }) {
  const [form, setForm] = useState(banner);
  const fileRef = useRef<HTMLInputElement>(null);
  const onFile = (f: File | undefined) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setForm({ ...form, imageUrl: r.result as string });
    r.readAsDataURL(f);
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-background rounded-2xl w-full max-w-xl max-h-[92vh] overflow-auto shadow-glow">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">Edit Banner</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4">
          <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-border bg-muted">
            {form.imageUrl && <img src={form.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />}
            <button type="button" onClick={() => fileRef.current?.click()} className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-md text-xs font-semibold shadow">
              <Upload className="h-3.5 w-3.5" /> Change image
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => onFile(e.target.files?.[0])} />
          <F label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} required />
          <F label="Subtitle" value={form.subtitle} onChange={v => setForm({ ...form, subtitle: v })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="CTA Text" value={form.cta} onChange={v => setForm({ ...form, cta: v })} />
            <F label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted">Cancel</button>
            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90">Save Banner</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function F({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return <label className="block"><span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    <input value={value} onChange={e => onChange(e.target.value)} required={required}
      className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" /></label>;
}
