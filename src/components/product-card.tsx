import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { formatN, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.slug);
  const badgeColor = product.badge === "Sale" ? "bg-destructive text-destructive-foreground"
    : product.badge === "New" ? "bg-primary text-primary-foreground"
    : "bg-gold text-gold-foreground";

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeColor} shadow-soft`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.slug); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center hover:scale-110 transition shadow-soft z-10"
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          className="absolute inset-0"
          aria-label={product.name}
        />
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-glow opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap z-10"
        >
          Quick View
        </Link>
      </div>
      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{product.brand}</div>
        <Link to="/shop/$slug" params={{ slug: product.slug }} className="font-serif text-lg font-semibold leading-tight hover:text-primary transition line-clamp-1 block">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-primary tabular-nums">{formatN(product.price)}</span>
            {product.compareAt && <span className="text-xs text-muted-foreground line-through tabular-nums">{formatN(product.compareAt)}</span>}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); add(product); toast.success(`${product.name} added to cart`); }}
            className="inline-flex items-center gap-1 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-md text-xs font-semibold transition"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
