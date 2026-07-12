import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Star, Heart, Minus, Plus, Shield, Truck, RefreshCw, X, ZoomIn, Check, Share2 } from "lucide-react";
import { useState } from "react";
import { getProduct, products, formatN } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    return { meta: [
      { title: p ? `${p.name} — EtiSkin` : "Product — EtiSkin" },
      { name: "description", content: p?.description ?? "Skincare product" },
    ]};
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const product = getProduct(slug)!;
  const { add, toggleWish, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const wished = wishlist.includes(product.slug);

  const gallery = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const related = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  const benefits = product.ingredients.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-primary">Shop</Link><ChevronRight className="h-3 w-3" />
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-3">
            {gallery.length > 1 && (
              <div className="hidden sm:flex flex-col gap-3">
                {gallery.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 transition ${i === activeImg ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}>
                    <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div
              className="group relative flex-1 aspect-square rounded-3xl overflow-hidden shadow-soft bg-muted/40 cursor-zoom-in"
              onClick={() => setLightbox(true)}
            >
              <img
                src={gallery[activeImg]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              <button className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition">
                <ZoomIn className="h-4 w-4" />
              </button>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-soft">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-[11px] font-bold px-3 py-1.5 rounded-full shadow-soft">
                  −{discount}%
                </span>
              )}
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="mt-3 flex sm:hidden gap-2 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? "border-primary" : "border-border"}`}>
                  <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info + Buy box */}
        <div>
          {product.badge && <span className="inline-block bg-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">{product.badge}</span>}
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{product.brand}</div>
          <h1 className="text-3xl md:text-5xl font-serif font-semibold leading-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
            ))}</div>
            <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-bold text-primary">{formatN(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatN(product.compareAt)}</span>
                <span className="text-xs font-semibold text-destructive">Save {formatN(product.compareAt - product.price)}</span>
              </>
            )}
          </div>

          <p className="mt-5 text-foreground/80 leading-relaxed">{product.description}</p>

          {benefits.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {benefits.map(b => (
                <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-primary shrink-0" /> {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Skin Type</div>
            <div className="flex flex-wrap gap-2">
              {product.skinType.map(s => (
                <span key={s} className="px-3 py-1 border border-border rounded-full text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-7 p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
            <span className="text-sm font-medium">Availability</span>
            {inStock ? (
              <span className={`text-sm font-semibold ${lowStock ? "text-destructive" : "text-primary"}`}>
                {lowStock ? `Only ${product.stock} left in stock` : "In stock"}
              </span>
            ) : (
              <span className="text-sm font-semibold text-destructive">Out of stock</span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={!inStock} className="p-3 hover:bg-muted disabled:opacity-40"><Minus className="h-4 w-4" /></button>
              <span className="px-4 font-semibold min-w-[2.5rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} disabled={!inStock} className="p-3 hover:bg-muted disabled:opacity-40"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => { add(product, qty); toast.success(`Added ${qty} × ${product.name}`); }}
              disabled={!inStock}
              className="flex-1 bg-primary text-primary-foreground font-semibold py-3.5 rounded-full hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {inStock ? `Add to Cart · ${formatN(product.price * qty)}` : "Out of Stock"}
            </button>
            <button onClick={() => { toggleWish(product.slug); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
              className={`p-3.5 border rounded-full transition ${wished ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              aria-label="Toggle wishlist">
              <Heart className={`h-5 w-5 ${wished ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied"); }}
              className="inline-flex items-center gap-1.5 hover:text-primary transition">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[[Shield, "100% Authentic"], [Truck, "Fast Delivery"], [RefreshCw, "Easy Returns"]].map(([I, t]) => (
              <div key={t as string} className="flex flex-col items-center gap-2 p-4 bg-muted/40 rounded-xl">
                <I className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-center">{t as string}</span>
              </div>
            ))}
          </div>

          <Accordion type="single" collapsible defaultValue="desc" className="mt-10">
            <AccordionItem value="desc">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                <p className="mt-2 text-foreground/80 leading-relaxed">Size: {product.size}.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ingredients">
              <AccordionTrigger>Ingredients</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-foreground/80">{product.ingredients.map(i => <li key={i}>{i}</li>)}</ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use">
              <AccordionTrigger>How to Use</AccordionTrigger>
              <AccordionContent>
                <p className="text-foreground/80 leading-relaxed">{product.howToUse}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-serif font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">{related.map(p => <ProductCard key={p.slug} product={p} />)}</div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <img src={gallery[activeImg]} alt={product.name} className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl" />
          {gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {gallery.map((src, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                  className={`h-2.5 w-2.5 rounded-full transition ${i === activeImg ? "bg-white scale-125" : "bg-white/40"}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}