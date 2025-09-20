import { Plane, Hotel, TrainFront, Bus, Package } from 'lucide-react'

const items = [
  { id: 'flights', label: 'Flights', icon: Plane, to: '/results' },
  { id: 'hotels', label: 'Hotels', icon: Hotel, to: '/hotels' },
  { id: 'trains', label: 'Trains', icon: TrainFront, to: '/trains' },
  { id: 'buses', label: 'Buses', icon: Bus, to: '/buses' },
  { id: 'holidays', label: 'Holidays', icon: Package, to: '/' },
]

import { NavLink } from 'react-router-dom'

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-t md:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ id, label, icon: Icon, to }) => (
          <NavLink key={id} to={to} className={({isActive}) => isActive ? 'flex flex-col items-center justify-center py-2 text-xs text-primary-700' : 'flex flex-col items-center justify-center py-2 text-xs text-gray-700 hover:text-primary-700'}>
            <Icon size={18} />
            <span className="mt-0.5">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}


