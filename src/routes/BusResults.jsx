import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { buses } from '../data/buses.js'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search])
}

function BusCard({ b }) {
  return (
    <div className="rounded-xl border bg-white p-4 card flex items-center justify-between">
      <div>
        <div className="font-semibold">{b.from} → {b.to}</div>
        <div className="text-sm text-gray-600">{b.dep} - {b.arr} · {b.duration} · {b.type}</div>
      </div>
      <div className="text-right">
        <div className="font-bold">₹{b.price.toLocaleString('en-IN')}</div>
        <button className="mt-2 inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-3 py-2 rounded-md">Book</button>
      </div>
    </div>
  )
}

export function BusResults() {
  const q = useQuery()
  const filtered = useMemo(() => buses.filter(b => {
    const fromOk = q.from ? b.from.toLowerCase().includes(q.from.toLowerCase()) : true
    const toOk = q.to ? b.to.toLowerCase().includes(q.to.toLowerCase()) : true
    return fromOk && toOk
  }), [q])
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container-safe py-6 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Buses</h1>
            <p className="text-sm text-gray-600">{q.from || 'Any'} → {q.to || 'Any'} · {filtered.length} results</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {filtered.map(b => (
            <BusCard key={b.id} b={b} />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}





