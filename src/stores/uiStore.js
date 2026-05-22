import { create } from 'zustand'

export const useUiStore = create((set) => ({
  isLoading: false,
  error: null,
  toast: null, // { message, type: 'success' | 'error' | 'info' }

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  /** Show a toast notification, auto-dismiss after 3s */
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } })
    setTimeout(() => set({ toast: null }), 3500)
  },
  clearToast: () => set({ toast: null }),
}))
