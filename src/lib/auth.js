import { useState, useEffect } from 'react'

const STORAGE_KEY = 'travelly_auth_v1'

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  notify()
}

export function getUser() {
  const state = read()
  return state?.user || null
}

export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation for demo
      if (email && password) {
        const user = { 
          id: 'u_' + Math.random().toString(36).slice(2), 
          email,
          initials: email[0].toUpperCase()
        }
        write({ user, token: 'mock_' + Date.now() })
        resolve(user)
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}

export function signUp(name, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && email && password) {
        const user = { 
          id: 'u_' + Math.random().toString(36).slice(2), 
          name, 
          email,
          initials: name[0].toUpperCase()
        }
        write({ user, token: 'mock_' + Date.now() })
        resolve(user)
      } else {
        reject(new Error('All fields are required'))
      }
    }, 700)
  })
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY)
  notify()
}

const listeners = new Set()
export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify() {
  for (const l of listeners) l(getUser())
}

// React hook for auth
export function useAuth() {
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    const unsubscribe = subscribe(setUser)
    return unsubscribe
  }, [])

  return {
    user,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  }
}




