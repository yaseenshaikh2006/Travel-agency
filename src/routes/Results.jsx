import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { flights } from '../data/flights.js'
import { fliSearchFlights, isFliEnabled } from '../lib/fli.js'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search])
}

function FlightCard({ f }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="rounded-xl border bg-white p-4 card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary-50 grid place-items-center text-primary-700 font-bold text-lg">
            {f.airline.substring(0,2).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-lg">{f.airline}</div>
            <div className="text-sm text-gray-600">{f.from} → {f.to}</div>
            <div className="text-xs text-gray-500 mt-1">
              {f.depart} - {f.arrive} · {f.duration} {f.nonstop ? '· Non-stop' : '· 1 stop'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl">₹{f.price.toLocaleString('en-IN')}</div>
          <div className="text-xs text-gray-500">per person</div>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary-700 hover:text-primary-800 border border-primary-200 px-2 py-1 rounded"
            >
              {expanded ? 'Less' : 'See More'}
            </button>
            <button className="inline-flex items-center gap-1 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-3 py-2 rounded-md">
              Book
            </button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Flight Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div><span className="font-medium">Flight:</span> {f.flight_number || f.id}</div>
                <div><span className="font-medium">Aircraft:</span> {f.aircraft || 'Boeing 737'}</div>
                <div><span className="font-medium">Class:</span> {f.booking_class || 'Economy'}</div>
                <div><span className="font-medium">Seats Available:</span> {f.seats_available || 'Limited'}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Timing</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div><span className="font-medium">Departure:</span> {f.depart} from {f.from}</div>
                <div><span className="font-medium">Arrival:</span> {f.arrive} at {f.to}</div>
                <div><span className="font-medium">Duration:</span> {f.duration}</div>
                <div><span className="font-medium">Stops:</span> {f.nonstop ? 'Direct' : '1 stop'}</div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded">
              View Route Map
            </button>
            <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded">
              Seat Selection
            </button>
            <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded">
              Add to Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Results() {
  const q = useQuery()
  const navigate = useNavigate()
  const [sort, setSort] = useState('price-asc')
  const [nonstopOnly, setNonstopOnly] = useState(false)
  const [loading, setLoading] = useState(true)
  const [remote, setRemote] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setRemote(null)
      if (isFliEnabled()) {
        try {
          const data = await fliSearchFlights({
            from: q.from || 'DEL',
            to: q.to || 'BOM',
            date: q.depart || new Date().toISOString().slice(0,10),
            nonstop: nonstopOnly,
            sort,
          })
          if (!cancelled) setRemote(data)
        } catch (e) {
          console.warn('FLI error', e)
        }
      }
      if (!cancelled) setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [q, sort, nonstopOnly])

  const usingLive = isFliEnabled()
  const filtered = useMemo(() => {
    const source = usingLive ? (
      Array.isArray(remote?.content) ? remote.content.map(r => ({
        id: r.id || r.flight_number || Math.random().toString(36).slice(2),
        from: r.departure_airport || r.from || '---',
        to: r.arrival_airport || r.to || '---',
        depart: r.departure_datetime?.slice(11,16) || r.departure_time || '--:--',
        arrive: r.arrival_datetime?.slice(11,16) || r.arrival_time || '--:--',
        duration: r.duration_readable || `${r.duration} min` || '',
        airline: r.airline || 'Airline',
        price: r.price || 0,
        nonstop: r.stops === 0 || r.nonstop || false,
      })) : []
    ) : flights
    let arr = source.filter(f => {
      const fromOk = q.from ? f.from.toLowerCase().includes(q.from.toLowerCase()) : true
      const toOk = q.to ? f.to.toLowerCase().includes(q.to.toLowerCase()) : true
      const nsOk = nonstopOnly ? f.nonstop : true
      return fromOk && toOk && nsOk
    })
    if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price)
    return arr
  }, [q, sort, nonstopOnly, remote, usingLive])

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container-safe py-8 flex-1">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold gradient-text">Flight Search Results</h1>
            {usingLive && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full animate-pulse">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                Live Data
              </span>
            )}
          </div>
          <p className="text-lg text-gray-600">{q.from || 'Any'} → {q.to || 'Any'} · {filtered.length} results found</p>
        </div>
        
        <div className="flex items-center justify-between gap-4 mb-6">
            <label className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors duration-300">
              <input type="checkbox" className="form-checkbox" checked={nonstopOnly} onChange={e => setNonstopOnly(e.target.checked)} />
              <span className="font-medium text-gray-700">Non-stop only</span>
            </label>
            <select value={sort} onChange={e => setSort(e.target.value)} className="form-select text-sm">
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
        </div>

        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 card animate-pulse">
                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            ))
          ) : filtered.length > 0 ? (
            filtered.map(f => (
              <FlightCard key={f.id} f={f} />
            ))
          ) : (
            <div className="rounded-xl border bg-white p-6 text-sm text-gray-700">
              No flights found for your search. Try changing filters or removing Non-stop.
            </div>
          )}
        </div>

        <div className="mt-6">
          <button onClick={() => navigate('/')} className="text-primary-700 text-sm hover:underline">← Modify Search</button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}


