export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <div className="container-safe py-20 sm:py-32">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Your next <span className="gradient-text">adventure</span> starts here
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Search and book flights, hotels, trains, buses and holiday packages with exclusive deals and real-time pricing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-white/50">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">Flash deals live now</span>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-white/50">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></span>
              <span className="text-sm font-medium text-gray-700">Real-time pricing</span>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-white/50">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></span>
              <span className="text-sm font-medium text-gray-700">Instant booking</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-32 -right-32 opacity-30 animate-pulse" width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="300" fill="url(#heroGradient)" />
          <defs>
            <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute -bottom-24 -left-24 opacity-20" width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" fill="url(#heroGradient2)" />
          <defs>
            <linearGradient id="heroGradient2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}




