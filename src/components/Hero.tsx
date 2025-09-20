export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="container-safe py-16 sm:py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Your next <span className="text-primary-600">adventure</span> starts here
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
            Search and book flights, hotels, trains, buses and holiday packages with exclusive deals.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-600">
            <span className="h-2 w-2 rounded-full bg-accent-500"></span>
            Flash deals live now
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-24 -right-24 opacity-20" width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="250" fill="url(#g)" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0084FF" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}





