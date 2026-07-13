import { createFileRoute } from "@tanstack/react-router";
import { salesData, orders, products, customers, formatN } from "@/lib/data";
import { TrendingUp, Package, Users, ShoppingCart, ArrowUp, ArrowDown, DollarSign, Activity } from "lucide-react";
import { StatusPill } from "@/routes/account";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  const revenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);

  const catData = ["face-care", "serums", "sunscreens", "acne-treatment", "body-care"].map(c => ({
    name: c.replace("-", " "),
    value: products.filter(p => p.category === c).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Adaeze. Here is how EtiSkin is doing today.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Total Revenue" value={formatN(revenue)} change={13.4} icon={TrendingUp} />
        <Stat label="Orders" value={totalOrders.toString()} change={8.7} icon={ShoppingCart} />
        <Stat label="Products" value={products.length.toString()} change={2.1} icon={Package} />
        <Stat label="Customers" value={customers.length.toString()} change={-1.2} icon={Users} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-serif text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="font-semibold text-sm">{o.id}</div>
                  <div className="text-xs text-muted-foreground">{o.customer} · {o.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{formatN(o.total)}</span>
                  <StatusPill status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-serif text-lg font-semibold mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {catData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(cat.value / products.length) * 100}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground tabular-nums">{cat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, change, icon: Icon }: { label: string; value: string; change: number; icon: any }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="text-xl font-serif font-semibold tabular-nums">{value}</div>
      <div className={`flex items-center gap-1 text-xs mt-1 ${change >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
        {change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        {Math.abs(change)}% from last month
      </div>
    </div>
  );
}
