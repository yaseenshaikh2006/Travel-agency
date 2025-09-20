import { Tag, Timer } from 'lucide-react'
import { flightDeals, hotelDeals } from '../data/deals.js'

function DealCard({ title, code, bank, expiresIn, color = 'bg-gray-50', cta = 'Apply' }) {
  return (
    <div className={`rounded-xl p-4 border ${color} card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg/50`}> 
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Tag size={16} /> {bank}
          </div>
          <h3 className="mt-1 font-semibold leading-snug">{title}</h3>
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-gray-600">
            <code className="bg-white/80 border rounded px-2 py-0.5 font-mono">{code}</code>
            <span className="inline-flex items-center gap-1"><Timer size={14} /> {expiresIn}</span>
          </div>
        </div>
        <button className="shrink-0 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-3 py-2 rounded-md shadow-sm">{cta}</button>
      </div>
    </div>
  )
}

export function Deals() {
  return (
    <section className="container-safe mt-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Deals & Offers</h2>
          <p className="text-gray-600 text-sm">Bank offers, flash sales and more</p>
        </div>
        <a className="text-sm text-primary-700 hover:underline" href="#">View all</a>
      </div>
      {/* Mobile horizontal scroll, grid on md+ */}
      <div className="mt-4 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {flightDeals.map(d => (
            <div key={d.id} className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-start">
              <DealCard {...d} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-2">
          {hotelDeals.map(d => (
            <div key={d.id} className="min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-start">
              <DealCard {...d} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


