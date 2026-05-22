import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuthStore()

  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Invalid email address'
    if (!form.username.trim()) e.username = 'Username is required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
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
      await register(form)
      navigate('/login')
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || 'Registration failed')
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
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">Join MockMart today</p>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              id="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={update('name')}
              error={errors.name}
              autoComplete="name"
            />
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
              label="Username"
              id="username"
              type="text"
              placeholder="username"
              value={form.username}
              onChange={update('username')}
              error={errors.username}
              autoComplete="username"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={update('password')}
              error={errors.password}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              loading={loading}
              colorClass="bg-gray-800 hover:bg-gray-700"
              className="w-full py-2.5 mt-2"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
