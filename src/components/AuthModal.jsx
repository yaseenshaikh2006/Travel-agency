import { X } from 'lucide-react'

export function AuthModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-sm rounded-xl bg-white border card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Sign in</h3>
            <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-md border"><X size={18} /></button>
          </div>
          <form className="mt-4 grid gap-3">
            <label className="text-sm">
              <div className="font-medium text-gray-700">Email</div>
              <input className="form-input mt-1" type="email" placeholder="you@example.com" />
            </label>
            <label className="text-sm">
              <div className="font-medium text-gray-700">Password</div>
              <input className="form-input mt-1" type="password" placeholder="••••••••" />
            </label>
            <button type="submit" className="mt-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  )
}





