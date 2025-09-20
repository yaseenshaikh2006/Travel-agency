import './index.css'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { SearchWidget } from './components/SearchWidget.jsx'
import { Deals } from './components/Deals.jsx'
import { PopularDestinations } from './components/PopularDestinations.jsx'
import { SiteFooter } from './components/SiteFooter.jsx'
import { BottomNav } from './components/BottomNav.jsx'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Hero />
        <section className="container-safe -mt-20 relative z-10">
          <div className="bg-white rounded-xl card p-4 sm:p-6">
            <SearchWidget />
          </div>
        </section>
        <Deals />
        <PopularDestinations />
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  )
}


