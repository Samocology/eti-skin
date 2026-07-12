import { createFileRoute } from "@tanstack/react-router";
import { salesData, orders, products, customers, formatN } from "@/lib/data";
import { TrendingUp, Package, Users, ShoppingCart, ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { StatusPill } from "@/routes/account";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  const revenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);

  const catData = ["face-care", "serums", "sunscreens", "acne-treatment", "body-care"].map(c => ({
    name: c.replace("-", " "),
    value: products.filter(p => p.category === c).length,
  }));
  const COLORS = ["oklch(0.35 0.15 295)", "oklch(0.72 0.14 70)", "oklch(0.55 0.15 320)", "oklch(0.45 0.12 260)", "oklch(0.65 0.11 40)"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Adaeze. Here's how EtiSkin is doing today.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Total Revenue" value={formatN(revenue)} change={13.4} icon={TrendingUp} />
        <Stat label="Orders" value={totalOrders.toString()} change={8.7} icon={ShoppingCart} />
        <Stat label="Products" value={products.length.toString()} change={2.1} icon={Package} />
        <Stat label="Customers" value={customers.length.toString()} change={-1.2} icon={Users} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-semibold">Revenue Trend</h2>
            <select className="text-xs border border-border rounded-md px-2 py-1">
              <option>Last 7 months</option><option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.35 0.15 295)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="oklch(0.35 0.15 295)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => "₦" + (v / 1000000).toFixed(1) + "M"} />
              <Tooltip formatter={(v: any) => formatN(v as number)} contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0.015 300)" }} />
              <Area type="monotone" dataKey="revenue" stroke="oklch(0.35 0.15 295)" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={catData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {catData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-4 space-y-1.5 text-xs">
            {catData.map((c, i) => (
              <li key={c.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i] }} />{c.name}</span>
                <span className="text-muted-foreground">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold">Recent Orders</h2>
            <a href="/admin/orders" className="text-xs text-primary font-semibold">View all →</a>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>{["Order", "Customer", "Total", "Status"].map(h => <th key={h} className="text-left pb-2 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map(o => (
                <tr key={o.id} className="border-t border-border">
                  <td className="py-3 font-semibold text-primary">{o.id}</td>
                  <td className="py-3">{o.customer}</td>
                  <td className="py-3 font-semibold">{formatN(o.total)}</td>
                  <td className="py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-background rounded-xl border border-border p-6">
          <h2 className="font-serif text-lg font-semibold mb-4">Orders by Month</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.9 0.015 300)" }} />
              <Bar dataKey="orders" fill="oklch(0.72 0.14 70)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, change, icon: Icon }: { label: string; value: string; change: number; icon: any }) {
  const up = change >= 0;
  return (
    <div className="bg-background rounded-xl border border-border p-5">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-5 w-5" /></div>
        <span className={`text-xs font-semibold flex items-center gap-0.5 tabular-nums ${up ? "text-success" : "text-destructive"}`}>
          {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{Math.abs(change)}%
        </span>
      </div>
      <div className="mt-4 text-3xl font-semibold tabular-nums tracking-tight text-foreground" style={{ fontFeatureSettings: '"tnum", "lnum"' }}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
}

