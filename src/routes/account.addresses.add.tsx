import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronLeft, MapPin } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/account/addresses/add')({
  component: AddAddressPage,
  head: () => ({ meta: [{ title: 'Add Address — EtiSkin' }] }),
})

function AddAddressPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ label: '', street: '', city: '', state: '', phone: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Address saved successfully')
    navigate({ to: '/account' })
  }

  return (
    <div className="mx-auto max-w-lg px-4 md:px-8 py-10">
      <button onClick={() => navigate({ to: '/account' })} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Account
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-semibold">Add New Address</h1>
          <p className="text-sm text-muted-foreground">Fill in your delivery details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider">Address Label</span>
          <input
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
            placeholder="e.g. Home, Office"
            className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider">Street Address</span>
          <input
            value={form.street}
            onChange={e => setForm({ ...form, street: e.target.value })}
            placeholder="Street name and number"
            className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider">City</span>
            <input
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
              placeholder="Lagos"
              className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider">State</span>
            <input
              value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })}
              placeholder="Lagos"
              className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider">Phone Number</span>
          <input
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+234 801 234 5678"
            className="mt-1 w-full px-3 py-2.5 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </label>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate({ to: '/account' })} className="flex-1 px-5 py-2.5 rounded-md text-sm font-semibold border border-border hover:bg-muted transition">
            Cancel
          </button>
          <button type="submit" className="flex-1 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition">
            Save Address
          </button>
        </div>
      </form>
    </div>
  )
}
