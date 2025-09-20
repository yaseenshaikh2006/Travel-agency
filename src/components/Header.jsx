import { Globe, Phone, User2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { AuthModal } from './AuthModal.jsx'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../lib/auth.js'

export function Header() {
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { user, signOut } = useAuth()
  return (
    <header className="sticky top-0 z-40 glass border-b border-white/20 shadow-soft">
      <div className="container-safe h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white grid place-items-center font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">T</div>
          <span className="font-extrabold text-xl gradient-text">Travelly</span>
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border text-gray-700">
          <Menu size={18} />
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Primary">
          <NavLink to="/results" onMouseEnter={() => import('../routes/Results.jsx')} className={({isActive}) => `px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-primary-700 font-semibold bg-primary-50' : 'hover:text-primary-600 hover:bg-gray-50'}`}>Flights</NavLink>
          <NavLink to="/hotels" onMouseEnter={() => import('../routes/HotelResults.jsx')} className={({isActive}) => `px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-primary-700 font-semibold bg-primary-50' : 'hover:text-primary-600 hover:bg-gray-50'}`}>Hotels</NavLink>
          <NavLink to="/trains" onMouseEnter={() => import('../routes/TrainResults.jsx')} className={({isActive}) => `px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-primary-700 font-semibold bg-primary-50' : 'hover:text-primary-600 hover:bg-gray-50'}`}>Trains</NavLink>
          <NavLink to="/buses" onMouseEnter={() => import('../routes/BusResults.jsx')} className={({isActive}) => `px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-primary-700 font-semibold bg-primary-50' : 'hover:text-primary-600 hover:bg-gray-50'}`}>Buses</NavLink>
          <NavLink to="/" className={({isActive}) => `px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? 'text-primary-700 font-semibold bg-primary-50' : 'hover:text-primary-600 hover:bg-gray-50'}`}>Holidays</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
            <Phone size={18} />
            Support
          </button>
          <button className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
            <Globe size={18} />
            EN | USD
          </button>
          {user ? (
            <div className="relative group">
              <NavLink to="/profile" className="inline-flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-xl text-sm hover:bg-gray-50 hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg">
                  {user.initials || user.email?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="hidden sm:inline max-w-[140px] truncate font-medium">{user.email}</span>
              </NavLink>
              <div className="absolute right-0 mt-3 w-52 rounded-xl border border-gray-200 bg-white shadow-strong opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 animate-fade-in-up">
                <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                  <div className="font-semibold">{user.email}</div>
                  <div className="text-xs text-gray-500">Signed in</div>
                </div>
                <NavLink to="/profile" className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 rounded-t-xl">My Profile</NavLink>
                <button onClick={() => signOut()} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 rounded-b-xl">Sign out</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="btn-primary text-sm px-4 py-2">
                <User2 size={18} /> Sign in
              </NavLink>
              <NavLink to="/register" className="hidden sm:inline text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors duration-300">Create account</NavLink>
            </div>
          )}
        </div>
      </div>
      {/* Mobile slide-over */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-72 max-w-[85%] bg-white shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary-600 text-white grid place-items-center font-bold">T</div>
                <span className="font-bold">Menu</span>
              </div>
              <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-md border">
                <X size={18} />
              </button>
            </div>
            <nav className="mt-4 grid gap-2 text-sm" aria-label="Mobile Primary">
              <NavLink to="/results" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">Flights</NavLink>
              <NavLink to="/hotels" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">Hotels</NavLink>
              <NavLink to="/trains" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">Trains</NavLink>
              <NavLink to="/buses" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">Buses</NavLink>
              <NavLink to="/" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-gray-50">Holidays</NavLink>
            </nav>
            <div className="mt-auto grid gap-2">
              {user ? (
                <button onClick={() => { signOut(); setOpen(false) }} className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-3 py-2 rounded-md">
                  Sign out
                </button>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-3 py-2 rounded-md">
                    <User2 size={18} /> Sign in
                  </NavLink>
                  <NavLink to="/register" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 border text-sm font-medium px-3 py-2 rounded-md">
                    Create account
                  </NavLink>
                </>
              )}
              <button className="inline-flex items-center justify-center gap-2 border text-sm font-medium px-3 py-2 rounded-md">
                <Globe size={18} /> EN | USD
              </button>
              <button className="inline-flex items-center justify-center gap-2 border text-sm font-medium px-3 py-2 rounded-md">
                <Phone size={18} /> Support
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Auth modal kept for optional use; routes now handle full pages */}
    </header>
  )
}


