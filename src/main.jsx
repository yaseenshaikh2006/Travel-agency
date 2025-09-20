import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
const Results = lazy(() => import('./routes/Results.jsx').then(m => ({ default: m.Results })))
const HotelResults = lazy(() => import('./routes/HotelResults.jsx').then(m => ({ default: m.HotelResults })))
const TrainResults = lazy(() => import('./routes/TrainResults.jsx').then(m => ({ default: m.TrainResults })))
const BusResults = lazy(() => import('./routes/BusResults.jsx').then(m => ({ default: m.BusResults })))
const Login = lazy(() => import('./routes/Login.jsx').then(m => ({ default: m.Login })))
const Register = lazy(() => import('./routes/Register.jsx').then(m => ({ default: m.Register })))
const Profile = lazy(() => import('./routes/Profile.jsx'))

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/results', element: <Results /> },
  { path: '/hotels', element: <HotelResults /> },
  { path: '/trains', element: <TrainResults /> },
  { path: '/buses', element: <BusResults /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/profile', element: <Profile /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="container-safe py-8">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)


