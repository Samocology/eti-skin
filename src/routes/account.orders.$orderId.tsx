import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'
import { orders, products, formatN } from '@/lib/data'

export const Route = createFileRoute('/account/orders/$orderId')({
  component: OrderDetailPage,
  head: () => ({ meta: [{ title: 'Order Details — EtiSkin' }] }),
})

const statusIcons: Record<string, any> = {
  Delivered: CheckCircle,
  Shipped: Truck,
  Processing: Clock,
  Pending: Package,
  Cancelled: XCircle,
}

const statusColors: Record<string, string> = {
  Delivered: 'text-success',
  Shipped: 'text-primary',
  Processing: 'text-gold',
  Pending: 'text-muted-foreground',
  Cancelled: 'text-destructive',
}

function OrderDetailPage() {
  const { orderId } = Route.useParams()
  const order = orders.find(o => o.id === orderId)

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-semibold mb-2">Order Not Found</h1>
        <p className="text-muted-foreground mb-4">We couldn't find order {orderId}.</p>
        <Link to="/account" className="text-primary font-semibold">Back to Account</Link>
      </div>
    )
  }

  const StatusIcon = statusIcons[order.status] || Package

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-8 py-10">
      <Link to="/account" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-serif font-semibold">Order {order.id}</h1>
            <p className="text-sm text-muted-foreground">{order.date}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${statusColors[order.status]} bg-muted/50`}>
            <StatusIcon className="h-4 w-4" />
            {order.status}
          </div>
        </div>

        {/* Progress tracker */}
        <div className="flex items-center justify-between mb-6 pt-4 border-t border-border">
          {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, i) => {
            const isDone = ['Delivered'].includes(order.status) || 
              (step === 'Shipped' && ['Delivered'].includes(order.status)) ||
              (step === 'Processing' && ['Shipped', 'Delivered'].includes(order.status)) ||
              (step === 'Pending' && ['Processing', 'Shipped', 'Delivered'].includes(order.status))
            const isCurrent = step === order.status
            return (
              <div key={step} className="flex flex-col items-center gap-1 flex-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${isDone ? 'bg-primary text-primary-foreground' : isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {isDone ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                <span className="text-[10px] text-muted-foreground text-center">{step}</span>
              </div>
            )
          })}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Customer</span><span className="font-medium">{order.customer}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Email</span><span className="font-medium">{order.email}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Items</span><span className="font-medium">{order.items}</span></div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="font-semibold">Total</span>
            <span className="font-serif text-lg font-bold text-primary tabular-nums">{formatN(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <button className="p-3 bg-card border border-border rounded-xl hover:bg-muted transition font-medium">Download Invoice</button>
        <button className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition font-medium">Track Package</button>
      </div>
    </div>
  )
}
