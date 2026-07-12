import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { orders, products, formatN } from "@/lib/data";
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/account")({
  component: AccountLayout,
  head: () => ({ meta: [{ title: "My Account — EtiSkin" }, { name: "robots", content: "noindex" }]}),
});

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

function AccountLayout() {
  const [tab, setTab] = useState<typeof tabs[number]["id"]>("orders");
  const { wishlist } = useCart();
  const wishedProducts = products.filter(p => wishlist.includes(p.slug));

  // If there's a sub-route being rendered, show Outlet instead
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isSubRoute = pathname !== '/account' && pathname.startsWith('/account');

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-6 md:py-12">
      {isSubRoute ? (
        <Outlet />
      ) : (
        <>
          {/* Profile header */}
          <div className="rounded-2xl bg-gradient-hero text-white p-5 md:p-7 mb-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-serif text-xl md:text-2xl font-semibold shrink-0">A</div>
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-gold">Welcome back</div>
                <h1 className="text-xl md:text-2xl font-serif font-semibold truncate">Hi, Amara</h1>
                <p className="text-xs md:text-sm opacity-80 truncate">amara@example.com · Member since Nov 2024</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
              <Stat n={orders.length} l="Orders" />
              <Stat n={wishedProducts.length} l="Wishlist" />
              <Stat n="₦184k" l="Lifetime" />
            </div>
          </div>

          {/* Mobile horizontal tabs */}
          <div className="md:hidden -mx-4 px-4 mb-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-1">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap border transition ${tab === t.id ? "bg-primary text-primary-foreground border-primary font-semibold" : "bg-card border-border"}`}>
                  <t.icon className="h-4 w-4" />{t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden md:block space-y-1">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${tab === t.id ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}>
                  <t.icon className="h-4 w-4" />{t.label}
                </button>
              ))}
              <Link to="/auth" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted text-destructive">
                <LogOut className="h-4 w-4" />Sign out
              </Link>
            </aside>

            <div>
              {tab === "orders" && (
                <div>
                  <h2 className="font-serif text-lg font-semibold mb-3 md:hidden">Your Orders</h2>
                  <div className="md:hidden space-y-3">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-semibold text-primary text-sm">{o.id}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{o.date} · {o.items} items</div>
                          </div>
                          <StatusPill status={o.status} />
                        </div>
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                          <span className="font-serif text-lg font-semibold tabular-nums">{formatN(o.total)}</span>
                          <Link to="/account/orders/$orderId" params={{ orderId: o.id }} className="text-xs font-semibold text-primary flex items-center gap-0.5">
                            View <ChevronRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
                    <div className="p-5 border-b border-border font-serif text-lg font-semibold">Your Orders</div>
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 text-xs uppercase tracking-wider">
                        <tr>{["Order", "Date", "Items", "Total", "Status", ""].map(h => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(o => (
                          <tr key={o.id} className="border-t border-border">
                            <td className="px-4 py-3 font-semibold text-primary">{o.id}</td>
                            <td className="px-4 py-3">{o.date}</td>
                            <td className="px-4 py-3">{o.items}</td>
                            <td className="px-4 py-3 font-semibold tabular-nums">{formatN(o.total)}</td>
                            <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                            <td className="px-4 py-3">
                              <Link to="/account/orders/$orderId" params={{ orderId: o.id }} className="text-xs font-semibold text-primary flex items-center gap-0.5">
                                View <ChevronRight className="h-3 w-3" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === "wishlist" && (
                <div>
                  <h2 className="font-serif text-lg font-semibold mb-4">Wishlist ({wishedProducts.length})</h2>
                  {wishedProducts.length === 0 ? (
                    <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground">
                      Your wishlist is empty. <Link to="/shop" className="text-primary font-semibold">Browse products →</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishedProducts.map(p => (
                        <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-soft transition group">
                          <div className="aspect-square overflow-hidden bg-muted/40">
                            <img src={p.imageUrl} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-3">
                            <div className="font-serif font-semibold text-sm line-clamp-1">{p.name}</div>
                            <div className="text-primary font-bold mt-1 tabular-nums">{formatN(p.price)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "addresses" && (
                <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif text-lg font-semibold">Saved Addresses</h2>
                    <Link to="/account/addresses/add" className="text-sm text-primary font-semibold">+ Add new address</Link>
                  </div>
                  <div className="border border-border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">Home</div>
                      <div className="text-sm text-muted-foreground mt-1">12 Ademola Adetokunbo Cres, Victoria Island, Lagos</div>
                      <div className="text-sm text-muted-foreground">+234 801 234 5678</div>
                    </div>
                    <Link to="/account/addresses/$addressId" params={{ addressId: "1" }}>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </div>
                </div>
              )}

              {tab === "settings" && (
                <form
                  onSubmit={(e) => { e.preventDefault(); import("sonner").then(m => m.toast.success("Profile updated")); }}
                  className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4 max-w-lg"
                >
                  <h2 className="font-serif text-lg font-semibold">Profile Settings</h2>
                  <label className="block"><span className="text-xs font-semibold uppercase tracking-wider">Name</span>
                    <input defaultValue="Amara Obi" className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" /></label>
                  <label className="block"><span className="text-xs font-semibold uppercase tracking-wider">Email</span>
                    <input defaultValue="amara@example.com" className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" /></label>
                  <label className="block"><span className="text-xs font-semibold uppercase tracking-wider">Phone</span>
                    <input defaultValue="+234 801 234 5678" className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" /></label>
                  <button className="w-full sm:w-auto bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold">Save Changes</button>
                </form>
              )}

              <Link to="/auth" className="md:hidden mt-6 flex items-center justify-center gap-2 px-3 py-3 rounded-md text-sm border border-border text-destructive">
                <LogOut className="h-4 w-4" />Sign out
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ n, l }: { n: string | number; l: string }) {
  return (
    <div>
      <div className="text-lg md:text-xl font-serif font-semibold text-gold tabular-nums">{n}</div>
      <div className="text-[10px] md:text-xs opacity-70 uppercase tracking-wider">{l}</div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Delivered: "bg-success/15 text-success",
    Shipped: "bg-primary/15 text-primary",
    Processing: "bg-gold/20 text-gold-foreground",
    Pending: "bg-muted text-muted-foreground",
    Cancelled: "bg-destructive/15 text-destructive",
  };
  return <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${map[status] ?? ""}`}>{status}</span>;
}
