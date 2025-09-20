import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { trains } from '../data/trains.js'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search])
}

function TrainCard({ t }) {
  return (
    <div className="rounded-xl border bg-white p-4 card flex items-center justify-between">
      <div>
        <div className="font-semibold">{t.from} → {t.to}</div>
        <div className="text-sm text-gray-600">{t.dep} - {t.arr} · {t.duration} · {t.cls}</div>
      </div>
      <div className="text-right">
        <div className="font-bold">₹{t.price.toLocaleString('en-IN')}</div>
        <button className="mt-2 inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-3 py-2 rounded-md">Book</button>
      </div>
    </div>
  )
}

export function TrainResults() {
  const q = useQuery()
  const [cls, setCls] = useState('Any')
  const filtered = useMemo(() => trains.filter(t => {
    const fromOk = q.from ? t.from.toLowerCase().includes(q.from.toLowerCase()) : true
    const toOk = q.to ? t.to.toLowerCase().includes(q.to.toLowerCase()) : true
    const classOk = cls === 'Any' ? true : t.cls === cls
    return fromOk && toOk && classOk
  }), [q, cls])
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container-safe py-6 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Trains</h1>
            <p className="text-sm text-gray-600">{q.from || 'Any'} → {q.to || 'Any'} · {filtered.length} results</p>
          </div>
          <div className="flex items-center gap-2">
            <select value={cls} onChange={e => setCls(e.target.value)} className="form-select text-sm">
              <option>Any</option>
              <option>3A</option>
              <option>2S</option>
            </select>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {filtered.map(t => (
            <TrainCard key={t.id} t={t} />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}





