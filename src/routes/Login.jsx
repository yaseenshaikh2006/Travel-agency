import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { useAuth } from '../lib/auth.js'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const last = localStorage.getItem('travelly_last_email')
    if (last) setEmail(last)
  }, [])

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo)
    }
  }, [user, navigate, location])

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signIn(email, password)
      localStorage.setItem('travelly_last_email', email)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container-safe py-8 flex-1">
        <h1 className="text-2xl font-bold">Sign in</h1>
        {user ? (
          <div className="mt-4 text-sm">Signed in as <span className="font-medium">{user.email}</span>. Redirecting...</div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 max-w-sm grid gap-3">
            <label className="text-sm">
              <div className="font-medium text-gray-700">Email</div>
              <input required className="form-input mt-1" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label className="text-sm">
              <div className="font-medium text-gray-700">Password</div>
              <input required minLength={6} className="form-input mt-1" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </label>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button disabled={loading} className="mt-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md">{loading ? 'Signing in…' : 'Sign in'}</button>
          </form>
        )}
      </main>
      <BottomNav />
    </div>
  )
}


