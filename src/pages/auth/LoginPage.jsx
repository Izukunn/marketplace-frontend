import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Invalid email address'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setApiError('')
    try {
      await login(form.email, form.password)
      // Redirect to originally requested page, or default to /shopee
      const from = location.state?.from || '/shopee'
      navigate(from, { replace: true })
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6 text-center">
            <p className="text-3xl mb-2">🛒</p>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your MockMart account</p>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={update('password')}
              error={errors.password}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              loading={loading}
              colorClass="bg-gray-800 hover:bg-gray-700"
              className="w-full py-2.5 mt-2"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
