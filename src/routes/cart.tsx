import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { formatN } from "@/lib/data";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Cart — EtiSkin" }]}),
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 20000 ? 0 : 1500;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-12">
      <h1 className="text-4xl font-serif font-semibold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-16 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h2 className="mt-4 text-xl font-serif font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">Discover our best-selling skincare products.</p>
          <Link to="/shop" className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold">Shop Now</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {items.map(({ product, qty }) => (
              <div key={product.slug} className="flex gap-4 p-5">
                <img src={product.imageUrl} alt={product.name} className="h-24 w-24 rounded-lg object-cover shrink-0 bg-muted/40" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{product.brand}</div>
                  <Link to="/shop/$slug" params={{ slug: product.slug }} className="font-serif font-semibold hover:text-primary line-clamp-1">{product.name}</Link>
                  <div className="text-sm text-muted-foreground mt-0.5">{product.size}</div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-md">
                      <button onClick={() => setQty(product.slug, qty - 1)} className="p-1.5 hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="px-3 text-sm font-semibold">{qty}</span>
                      <button onClick={() => setQty(product.slug, qty + 1)} className="p-1.5 hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => remove(product.slug)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{formatN(product.price * qty)}</div>
                  {qty > 1 && <div className="text-xs text-muted-foreground">{formatN(product.price)} each</div>}
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-20">
            <h2 className="font-serif text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={formatN(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatN(shipping)} />
              {shipping === 0 && <div className="text-xs text-success">Free shipping on orders over ₦20,000 ✓</div>}
              <div className="border-t border-border pt-3 mt-3">
                <Row label="Total" value={formatN(total)} big />
              </div>
            </div>
            <Link to="/checkout" className="mt-6 block text-center bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-sm text-primary font-semibold">Continue Shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return <div className={`flex justify-between ${big ? "text-lg font-bold" : ""}`}><span className={big ? "" : "text-muted-foreground"}>{label}</span><span>{value}</span></div>;
}
