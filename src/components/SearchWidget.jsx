import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Hotel, TrainFront, Bus, Package } from 'lucide-react'
import { clsx } from 'clsx'

const TABS = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Hotel },
  { id: 'trains', label: 'Trains', icon: TrainFront },
  { id: 'buses', label: 'Buses', icon: Bus },
  { id: 'holidays', label: 'Holidays', icon: Package },
]

export function SearchWidget() {
  const [activeTab, setActiveTab] = useState('flights')
  const navigate = useNavigate()

  return (
    <div role="group" aria-label="Search services" className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-strong border border-white/50 p-6 animate-fade-in-up">
      <div className="flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Service tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={clsx(
              'inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105',
              activeTab === id
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg border-2 border-primary-500'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-md'
            )}
            role="tab"
            aria-selected={activeTab === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const idx = TABS.findIndex(t => t.id === activeTab)
                const next = e.key === 'ArrowRight' ? (idx + 1) % TABS.length : (idx - 1 + TABS.length) % TABS.length
                setActiveTab(TABS[next].id)
              }
            }}
          >
            <Icon size={20} className={activeTab === id ? 'animate-bounce' : ''} /> 
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div role="tabpanel" id="panel-flights" aria-labelledby="tab-flights" hidden={activeTab !== 'flights'}>
          <FlightForm onSubmit={(params) => navigate(`/results?${new URLSearchParams(params).toString()}`)} />
        </div>
        <div role="tabpanel" id="panel-hotels" aria-labelledby="tab-hotels" hidden={activeTab !== 'hotels'}>
          <HotelForm />
        </div>
        <div role="tabpanel" id="panel-trains" aria-labelledby="tab-trains" hidden={activeTab !== 'trains'}>
          <TrainForm />
        </div>
        <div role="tabpanel" id="panel-buses" aria-labelledby="tab-buses" hidden={activeTab !== 'buses'}>
          <BusForm />
        </div>
        <div role="tabpanel" id="panel-holidays" aria-labelledby="tab-holidays" hidden={activeTab !== 'holidays'}>
          <HolidayForm />
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      {children}
    </label>
  )
}

function FlightForm({ onSubmit }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [depart, setDepart] = useState('')
  const [ret, setRet] = useState('')
  const [nonstop, setNonstop] = useState(false)
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.({ from, to, depart, return: ret, nonstop }) }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mt-6">
      <Field label="From">
        <input className="form-input" placeholder="City or Airport" value={from} onChange={e => setFrom(e.target.value)} />
      </Field>
      <Field label="To">
        <input className="form-input" placeholder="City or Airport" value={to} onChange={e => setTo(e.target.value)} />
      </Field>
      <Field label="Departure">
        <input type="date" className="form-input" value={depart} onChange={e => setDepart(e.target.value)} />
      </Field>
      <Field label="Return">
        <input type="date" className="form-input" value={ret} onChange={e => setRet(e.target.value)} />
      </Field>
      <Field label="Passengers">
        <select className="form-select">
          <option>1 Adult</option>
          <option>2 Adults</option>
          <option>Family</option>
        </select>
      </Field>
      <Field label="Class">
        <select className="form-select">
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First</option>
        </select>
      </Field>
      <div className="lg:col-span-6 flex flex-wrap items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors duration-300">
            <input type="checkbox" className="form-checkbox" checked={nonstop} onChange={e => setNonstop(e.target.checked)} />
            <span className="font-medium text-gray-700">Direct flights only</span>
          </label>
          <label className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors duration-300">
            <input type="checkbox" className="form-checkbox" />
            <span className="font-medium text-gray-700">Armed forces discount</span>
          </label>
        </div>
        <button type="submit" className="btn-accent text-lg py-4 px-8 font-semibold">
          <Plane size={20} className="inline mr-2" />
          Search Flights
        </button>
      </div>
    </form>
  )
}

function HotelForm() {
  return (
    <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="City / Hotel">
        <input className="form-input" placeholder="Where to?" />
      </Field>
      <Field label="Check-in">
        <input type="date" className="form-input" />
      </Field>
      <Field label="Check-out">
        <input type="date" className="form-input" />
      </Field>
      <Field label="Guests & Rooms">
        <select className="form-select">
          <option>2 Guests, 1 Room</option>
          <option>3 Guests, 2 Rooms</option>
        </select>
      </Field>
      <div className="flex items-end">
        <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium px-4 py-2 rounded-md">
          Search Hotels
        </button>
      </div>
    </form>
  )
}

function TrainForm() {
  return (
    <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="From">
        <input className="form-input" placeholder="Station" />
      </Field>
      <Field label="To">
        <input className="form-input" placeholder="Station" />
      </Field>
      <Field label="Date">
        <input type="date" className="form-input" />
      </Field>
      <Field label="Class">
        <select className="form-select">
          <option>Any</option>
          <option>AC 3 Tier</option>
          <option>AC 2 Tier</option>
          <option>Sleeper</option>
        </select>
      </Field>
      <div className="flex items-end">
        <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium px-4 py-2 rounded-md">
          Search Trains
        </button>
      </div>
    </form>
  )
}

function BusForm() {
  return (
    <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Field label="From">
        <input className="form-input" placeholder="City" />
      </Field>
      <Field label="To">
        <input className="form-input" placeholder="City" />
      </Field>
      <Field label="Date">
        <input type="date" className="form-input" />
      </Field>
      <div className="flex items-end">
        <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium px-4 py-2 rounded-md">
          Search Buses
        </button>
      </div>
    </form>
  )
}

function HolidayForm() {
  return (
    <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="Destination">
        <input className="form-input" placeholder="City or Country" />
      </Field>
      <Field label="Departure">
        <input type="date" className="form-input" />
      </Field>
      <Field label="Return">
        <input type="date" className="form-input" />
      </Field>
      <Field label="Travelers">
        <select className="form-select">
          <option>2 Travelers</option>
          <option>4 Travelers</option>
        </select>
      </Field>
      <div className="flex items-end">
        <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium px-4 py-2 rounded-md">
          Search Packages
        </button>
      </div>
    </form>
  )
}


