import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { useAuth } from '../lib/auth.js'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, signUp } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signUp(name, email, password)
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container-safe py-8 flex-1">
        <h1 className="text-2xl font-bold">Create account</h1>
        {user ? (
          <div className="mt-4 text-sm">Registered as <span className="font-medium">{user.email}</span>. Redirecting...</div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 max-w-sm grid gap-3">
            <label className="text-sm">
              <div className="font-medium text-gray-700">Full name</div>
              <input required className="form-input mt-1" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
            </label>
            <label className="text-sm">
              <div className="font-medium text-gray-700">Email</div>
              <input required className="form-input mt-1" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label className="text-sm">
              <div className="font-medium text-gray-700">Password</div>
              <input required minLength={6} className="form-input mt-1" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </label>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button disabled={loading} className="mt-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md">{loading ? 'Creating…' : 'Create account'}</button>
          </form>
        )}
      </main>
      <BottomNav />
    </div>
  )
}




