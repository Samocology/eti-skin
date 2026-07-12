import { createFileRoute } from "@tanstack/react-router";
import { customers, formatN } from "@/lib/data";
import { Mail, TrendingUp, Users, DollarSign } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({ component: AdminCustomers });

function AdminCustomers() {
  const total = customers.length;
  const revenue = customers.reduce((s, c) => s + c.spend, 0);
  const avg = Math.round(revenue / total);
  const active = customers.filter(c => c.orders > 3).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Customers</h1>
        <p className="text-sm text-muted-foreground">All customer accounts and analytics</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat icon={Users} label="Total customers" value={total.toString()} />
        <Stat icon={TrendingUp} label="Active (3+ orders)" value={active.toString()} />
        <Stat icon={DollarSign} label="Lifetime revenue" value={formatN(revenue)} />
        <Stat icon={DollarSign} label="Avg per customer" value={formatN(avg)} />
      </div>

      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border font-serif text-lg font-semibold">Customer List</div>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground bg-muted/40">
            <tr>{["Customer", "Email", "Orders", "Total Spend", "Joined", ""].map(h => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-hero text-white flex items-center justify-center text-sm font-serif font-semibold">{c.name[0]}</div>
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                <td className="px-4 py-3 font-semibold">{c.orders}</td>
                <td className="px-4 py-3 font-semibold text-primary">{formatN(c.spend)}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.joined}</td>
                <td className="px-4 py-3 text-right">
                  <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                    <Mail className="h-3 w-3" /> Email
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function Stat({ icon: Icon, label, value }: any) {
  return <div className="bg-background rounded-xl border border-border p-5">
    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><Icon className="h-5 w-5" /></div>
    <div className="text-3xl font-semibold tabular-nums tracking-tight" style={{ fontFeatureSettings: '"tnum", "lnum"' }}>{value}</div>
    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">{label}</div>
  </div>;
}

