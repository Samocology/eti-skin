import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { formatN } from "@/lib/data";
import { Lock, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — EtiSkin" }, { name: "robots", content: "noindex" }]}),
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const nav = useNavigate();
  const shipping = subtotal > 20000 ? 0 : 1500;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "ETI-" + Math.floor(10000 + Math.random() * 90000);
    clear();
    toast.success(`Order ${id} placed! Confirmation sent to your email.`);
    nav({ to: "/account" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-12">
      <h1 className="text-3xl font-serif font-semibold mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
          <Section title="Contact">
            <Grid>
              <F label="Email" type="email" required cls="sm:col-span-2" />
              <F label="Phone" required cls="sm:col-span-2" />
            </Grid>
          </Section>
          <Section title="Shipping Address">
            <Grid>
              <F label="First name" required />
              <F label="Last name" required />
              <F label="Address" required cls="sm:col-span-2" />
              <F label="City" required />
              <F label="State" required />
            </Grid>
          </Section>
          <Section title="Payment">
            <div className="space-y-3">
              {[
                ["card", "Credit / Debit Card", "Visa, Mastercard, Verve"],
                ["paystack", "Paystack", "Pay with any Nigerian card or bank"],
                ["transfer", "Bank Transfer", "Manual bank transfer"],
              ].map(([id, name, desc], i) => (
                <label key={id} className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input type="radio" name="pay" defaultChecked={i === 0} className="accent-primary" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </Section>
        </div>

        <aside className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-20">
          <h2 className="font-serif text-lg font-semibold mb-4">Order</h2>
          <div className="space-y-3 max-h-72 overflow-auto">
            {items.map(({ product, qty }) => (
              <div key={product.slug} className="flex gap-3 text-sm">
                <div className="relative h-14 w-14 rounded overflow-hidden shrink-0 bg-muted/40">
                  <img src={product.imageUrl} alt={product.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">{qty}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium line-clamp-1">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.size}</div>
                </div>
                <div className="font-semibold text-sm">{formatN(product.price * qty)}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatN(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatN(shipping)}</span></div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border"><span>Total</span><span className="text-primary">{formatN(total)}</span></div>
          </div>
          <button type="submit" disabled={items.length === 0} className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" /> Place Order · {formatN(total)}
          </button>
          <div className="mt-3 text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <Check className="h-3 w-3 text-success" /> Secure checkout · SSL encrypted
          </div>
          {items.length === 0 && <Link to="/shop" className="mt-4 block text-center text-xs text-primary font-semibold">Cart empty — shop products</Link>}
        </aside>
      </form>
    </div>
  );
}
function Section({ title, children }: any) {
  return <div className="bg-card rounded-2xl border border-border p-6"><h2 className="font-serif text-lg font-semibold mb-4">{title}</h2>{children}</div>;
}
function Grid({ children }: any) { return <div className="grid sm:grid-cols-2 gap-4">{children}</div>; }
function F({ label, type = "text", required, cls = "" }: any) {
  return <label className={`block ${cls}`}><span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    <input type={type} required={required} className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:ring-2 focus:ring-primary focus:outline-none" /></label>;
}
