import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronLeft, MapPin, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/account/addresses/$addressId')({
  component: AddressDetailPage,
  head: () => ({ meta: [{ title: 'Address Details — EtiSkin' }] }),
})

function AddressDetailPage() {
  const navigate = useNavigate()
  const { addressId } = Route.useParams()

  return (
    <div className="mx-auto max-w-lg px-4 md:px-8 py-10">
      <button onClick={() => navigate({ to: '/account' })} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Account
      </button>

      <div className="bg-card border border-border rounded-xl p-5 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold">Home</h1>
              <p className="text-xs text-muted-foreground">Default delivery address</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button onClick={() => toast.success('Address updated')} className="p-2 rounded-md hover:bg-muted transition">
              <Pencil className="h-4 w-4" />
            </button>
            <button onClick={() => { toast.success('Address deleted'); navigate({ to: '/account' }) }} className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Address</div>
            <div className="font-medium mt-0.5">12 Ademola Adetokunbo Crescent</div>
            <div>Victoria Island, Lagos</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Phone</div>
            <div className="font-medium mt-0.5">+234 801 234 5678</div>
          </div>
        </div>
      </div>
    </div>
  )
}
