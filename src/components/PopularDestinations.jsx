import { domesticDestinations, internationalDestinations } from '../data/destinations.js'

function DestinationCard({ name, image, priceFrom }) {
  return (
    <a href="#" className="group overflow-hidden rounded-xl border bg-white card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg/50">
      <div className="aspect-[4/3] overflow-hidden">
        <img loading="lazy" src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">From ₹{priceFrom.toLocaleString('en-IN')}</p>
        </div>
        <span className="text-primary-700 text-sm font-medium">Explore →</span>
      </div>
    </a>
  )
}

export function PopularDestinations() {
  return (
    <section className="container-safe mt-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Popular Destinations</h2>
          <p className="text-gray-600 text-sm">Top picks for your next trip</p>
        </div>
      </div>
      <h3 className="mt-4 font-semibold text-gray-800">Domestic</h3>
      <div className="mt-2 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {domesticDestinations.map(d => (
            <div key={d.id} className="min-w-[70%] sm:min-w-[45%] md:min-w-0 snap-start">
              <DestinationCard {...d} />
            </div>
          ))}
        </div>
      </div>
      <h3 className="mt-6 font-semibold text-gray-800">International</h3>
      <div className="mt-2 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory md:mx-0 md:px-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {internationalDestinations.map(d => (
            <div key={d.id} className="min-w-[70%] sm:min-w-[45%] md:min-w-0 snap-start">
              <DestinationCard {...d} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


