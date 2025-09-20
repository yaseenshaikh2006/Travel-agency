import './index.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SearchWidget } from './components/SearchWidget'

function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="container-safe -mt-20 relative z-10">
          <div className="bg-white rounded-xl card p-4 sm:p-6">
            <SearchWidget />
          </div>
        </section>
      </main>
      <footer className="mt-16 border-t bg-gray-50">
        <div className="container-safe py-8 text-sm text-gray-600">
          © {new Date().getFullYear()} Travelly. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
