import { Globe, Phone, User2 } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="container-safe h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-primary-500 text-white grid place-items-center font-bold">T</div>
          <span className="font-extrabold text-xl">Travelly</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-primary-600" href="#">Flights</a>
          <a className="hover:text-primary-600" href="#">Hotels</a>
          <a className="hover:text-primary-600" href="#">Trains</a>
          <a className="hover:text-primary-600" href="#">Buses</a>
          <a className="hover:text-primary-600" href="#">Holidays</a>
          <a className="hover:text-primary-600" href="#">Insurance</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
            <Phone size={18} />
            Support
          </button>
          <button className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
            <Globe size={18} />
            EN | USD
          </button>
          <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-3 py-2 rounded-md">
            <User2 size={18} /> Sign in
          </button>
        </div>
      </div>
    </header>
  )
}





