import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, LogOut, Bell, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — EtiSkin" }, { name: "robots", content: "noindex" }]}),
});

const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/blog", label: "Blog & Content", icon: FileText },
];

function AdminLayout() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 md:flex">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 bg-sidebar text-sidebar-foreground h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 font-serif">
          <span className="text-lg font-semibold">ETI</span>
          <span className="h-4 w-px bg-gold" />
          <span className="text-lg font-semibold text-gold">SKIN</span>
          <span className="ml-1 text-[10px] uppercase tracking-widest text-gold/70">Admin</span>
        </Link>
        <button onClick={() => setMobileOpen(o => !o)} className="p-2" aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <aside onClick={e => e.stopPropagation()} className="w-72 h-full bg-sidebar text-sidebar-foreground flex flex-col">
            <div className="p-5 border-b border-sidebar-border flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-1"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {nav.map(n => {
                const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
                return (
                  <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${active ? "bg-sidebar-accent text-sidebar-primary font-semibold" : "hover:bg-sidebar-accent/50"}`}>
                    <n.icon className="h-4 w-4" />{n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-sidebar-border">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-sidebar-accent/50">
                <LogOut className="h-4 w-4" />Exit Admin
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar — sticky */}
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen w-64 bg-sidebar text-sidebar-foreground flex-col shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2 font-serif">
            <span className="text-xl font-semibold">ETI</span>
            <span className="h-5 w-px bg-gold" />
            <span className="text-xl font-semibold text-gold">SKIN</span>
            <span className="ml-1 text-[10px] uppercase tracking-widest text-gold/70">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map(n => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${active ? "bg-sidebar-accent text-sidebar-primary font-semibold" : "hover:bg-sidebar-accent/50"}`}>
                <n.icon className="h-4 w-4" />{n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-sidebar-accent/50">
            <LogOut className="h-4 w-4" />Exit Admin
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-background border-b border-border items-center justify-between px-6 sticky top-0 z-30 shrink-0">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search products, orders, customers…" className="w-full pl-10 pr-3 py-2 rounded-md bg-muted border border-transparent focus:border-primary focus:bg-background focus:outline-none text-sm" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-md relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-gradient-hero text-white flex items-center justify-center text-sm font-serif font-semibold">A</div>
              <div className="text-sm">
                <div className="font-semibold leading-tight">Adaeze</div>
                <div className="text-xs text-muted-foreground leading-tight">Owner</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
