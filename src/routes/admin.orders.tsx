import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { orders as seed, formatN, type Order } from "@/lib/data";
import { StatusPill } from "@/routes/account";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

const STATUSES: Order["status"][] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const [list, setList] = useState(seed);
  const [filter, setFilter] = useState<"All" | Order["status"]>("All");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = filter === "All" ? list : list.filter(o => o.status === filter);

  const updateStatus = (id: string, status: Order["status"]) => {
    setList(l => l.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} → ${status}`);
    setSelected(s => s && s.id === id ? { ...s, status } : s);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and track all customer orders</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
        {(["All", ...STATUSES] as const).map(s => {
          const count = s === "All" ? list.length : list.filter(o => o.status === s).length;
          const active = filter === s;
          return (
            <button key={s} onClick={() => setFilter(s)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition ${active ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-background border-border text-foreground hover:border-primary"}`}>
              <span>{s}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full tabular-nums ${active ? "bg-white/20" : "bg-muted text-muted-foreground"}`}>{count}</span>
            </button>
          );
        })}
      </div>


      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">

          <thead className="text-xs uppercase text-muted-foreground bg-muted/40">
            <tr>{["Order ID", "Customer", "Date", "Items", "Total", "Status", ""].map(h => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t border-border hover:bg-muted/20">
                <td className="px-4 py-3 font-semibold text-primary">{o.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{o.customer}</div>
                  <div className="text-xs text-muted-foreground">{o.email}</div>
                </td>
                <td className="px-4 py-3">{o.date}</td>
                <td className="px-4 py-3">{o.items}</td>
                <td className="px-4 py-3 font-semibold">{formatN(o.total)}</td>
                <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelected(o)} className="text-xs text-primary font-semibold">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>


      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} className="bg-background rounded-2xl w-full max-w-md">
            <div className="p-5 border-b border-border">
              <div className="text-xs text-muted-foreground">Order</div>
              <div className="font-serif text-2xl font-semibold text-primary">{selected.id}</div>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <Row label="Customer" val={selected.customer} />
              <Row label="Email" val={selected.email} />
              <Row label="Date" val={selected.date} />
              <Row label="Items" val={selected.items.toString()} />
              <Row label="Total" val={formatN(selected.total)} />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Update status</div>
                <div className="grid grid-cols-2 gap-2">
                  {STATUSES.map(s => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      className={`py-2 rounded-md text-xs font-semibold border ${selected.status === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border flex justify-end">
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-md text-sm border border-border">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function Row({ label, val }: { label: string; val: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{val}</span></div>;
}
