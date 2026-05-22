import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { getMe } from '../../services/authService'
import Button from '../../components/common/Button'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then(({ data }) => setProfile(data.data || data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const displayUser = profile || user

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 px-6 py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {displayUser?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <h1 className="text-white font-bold text-lg">
              {loading ? '...' : (displayUser?.name || 'User')}
            </h1>
            <p className="text-gray-400 text-sm">{displayUser?.email}</p>
          </div>

          {/* Info */}
          <div className="px-6 py-5">
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <div className="flex flex-col gap-3">
                <InfoRow label="Name" value={displayUser?.name} />
                <InfoRow label="Email" value={displayUser?.email} />
                <InfoRow label="Username" value={displayUser?.username || displayUser?.name} />
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="px-6 pb-4 flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Quick Links</p>
            {['shopee', 'tokopedia', 'lazada'].map((mp) => (
              <Link
                key={mp}
                to={`/${mp}/my-orders`}
                className="text-sm text-blue-600 hover:underline capitalize"
              >
                {mp.charAt(0).toUpperCase() + mp.slice(1)} Orders →
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleLogout}
              colorClass="bg-red-500 hover:bg-red-600"
              className="w-full py-2.5"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm font-medium text-gray-500 w-24 shrink-0">{label}</span>
      <span className="text-sm text-gray-800">{value || '-'}</span>
    </div>
  )
}
