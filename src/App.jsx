import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './stores/authStore'

function App() {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage)

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  return <AppRoutes />
}

export default App
