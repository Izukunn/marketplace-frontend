import { create } from 'zustand'
import api from '../api/client'

const readAuthPayload = (responseData) => {
  if (responseData?.success === false) {
    throw new Error(responseData.message || 'Request failed')
  }

  return responseData?.data ?? responseData
}

const extractUserAndToken = (responseData) => {
  const payload = readAuthPayload(responseData)
  const user = payload?.user ?? payload?.profile ?? payload?.data ?? payload
  const token = payload?.token ?? payload?.accessToken ?? payload?.jwt ?? null

  return { user, token }
}

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isInitialized: false,

  /** Load persisted auth state from localStorage on app init */
  loadFromStorage: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        set({ token: null, user: null, isInitialized: true })
        return
      }

      set({ token })

      try {
        const { data } = await api.get('/auth/me')
        const { user } = extractUserAndToken(data)
        localStorage.setItem('user', JSON.stringify(user))
        set({ user })
      } catch {
        const cachedUser = JSON.parse(localStorage.getItem('user') || 'null')
        if (cachedUser) {
          set({ user: cachedUser })
        }
      }
    } catch {
      // Ignore parse errors
    } finally {
      set({ isInitialized: true })
    }
  },

  /** Login: call API, persist to localStorage, update store */
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    const { user, token } = extractUserAndToken(data)
    if (!token) throw new Error('Login response did not include a token')

    localStorage.setItem('token', token)

    let resolvedUser = user
    if (!resolvedUser || resolvedUser === data) {
      const profileResponse = await api.get('/auth/me')
      const { user: profileUser } = extractUserAndToken(profileResponse.data)
      resolvedUser = profileUser
    }

    localStorage.setItem('user', JSON.stringify(resolvedUser))
    set({ user: resolvedUser, token })
    return resolvedUser
  },

  /** Register: call API */
  register: async (userData) => {
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }
    const { data } = await api.post('/auth/register', payload)
    return readAuthPayload(data)
  },

  /** Logout: clear everything */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },
}))
