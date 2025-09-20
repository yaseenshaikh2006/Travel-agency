import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="container-safe py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-primary-600 text-white grid place-items-center font-bold">T</div>
              <span className="font-extrabold text-lg">Travelly</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 max-w-xs">Book flights, hotels, trains, buses and curated holiday packages with exclusive deals.</p>
            <div className="mt-4 flex items-center gap-3 text-gray-600">
              <a href="#" aria-label="Facebook" className="hover:text-gray-900"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-900"><Twitter size={18} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-900"><Instagram size={18} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-gray-900"><Youtube size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-gray-900" href="#">About</a></li>
              <li><a className="hover:text-gray-900" href="#">Careers</a></li>
              <li><a className="hover:text-gray-900" href="#">Press</a></li>
              <li><a className="hover:text-gray-900" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-gray-900" href="#">Help Center</a></li>
              <li><a className="hover:text-gray-900" href="#">Cancellation</a></li>
              <li><a className="hover:text-gray-900" href="#">Report Issue</a></li>
              <li><a className="hover:text-gray-900" href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-gray-900" href="#">Terms of Use</a></li>
              <li><a className="hover:text-gray-900" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-gray-900" href="#">Cookie Policy</a></li>
              <li><a className="hover:text-gray-900" href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-600">© {new Date().getFullYear()} Travelly. All rights reserved.</div>
      </div>
    </footer>
  )
}


