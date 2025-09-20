import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { hotels } from '../data/hotels.js'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search])
}

function HotelCard({ h }) {
  return (
    <div className="rounded-xl border bg-white p-4 card flex items-center justify-between">
      <div>
        <div className="font-semibold">{h.name}</div>
        <div className="text-sm text-gray-600">{h.city} · {h.rating}★ · {h.amenities.join(', ')}</div>
      </div>
      <div className="text-right">
        <div className="font-bold">₹{h.price.toLocaleString('en-IN')}</div>
        <button className="mt-2 inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-3 py-2 rounded-md">Book</button>
      </div>
    </div>
  )
}

export function HotelResults() {
  const q = useQuery()
  const [minRating, setMinRating] = useState(0)
  const filtered = useMemo(() => hotels.filter(h => (q.city ? h.city.toLowerCase().includes(q.city.toLowerCase()) : true) && h.rating >= minRating), [q, minRating])
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container-safe py-6 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Hotels</h1>
            <p className="text-sm text-gray-600">{q.city || 'Anywhere'} · {filtered.length} results</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Min rating</label>
            <select value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="form-select text-sm">
              <option value={0}>Any</option>
              <option value={3}>3★+</option>
              <option value={4}>4★+</option>
            </select>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {filtered.map(h => (
            <HotelCard key={h.id} h={h} />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}





