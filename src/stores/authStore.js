import { create } from 'zustand'
import api from '../api/client'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  /** Load persisted auth state from localStorage on app init */
  loadFromStorage: () => {
    try {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      if (token && user) set({ token, user })
    } catch {
      // Ignore parse errors
    }
  },

  /** Login: call API, persist to localStorage, update store */
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    if (!data.success) throw new Error(data.message || 'Login failed')
    const { user, token } = data.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token })
    return user
  },

  /** Register: call API */
  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData)
    if (!data.success) throw new Error(data.message || 'Registration failed')
    return data
  },

  /** Logout: clear everything */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },
}))
