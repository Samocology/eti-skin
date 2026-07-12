import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, MapPin, Plus, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/account/addresses')({
  component: AddressesPage,
  head: () => ({ meta: [{ title: 'Addresses — EtiSkin' }] }),
})

function AddressesPage() {
  return (
    <div className="mx-auto max-w-lg px-4 md:px-8 py-10">
      <Link to="/account" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Account
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-semibold">Saved Addresses</h1>
        <Link to="/account/addresses/add" className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
          <Plus className="h-4 w-4" /> Add New
        </Link>
      </div>

      <div className="space-y-3">
        <Link to="/account/addresses/$addressId" params={{ addressId: '1' }} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-soft transition group">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">Home</div>
            <div className="text-xs text-muted-foreground truncate">12 Ademola Adetokunbo Cres, Victoria Island, Lagos</div>
            <div className="text-xs text-muted-foreground">+234 801 234 5678</div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition shrink-0" />
        </Link>
      </div>
    </div>
  )
}
