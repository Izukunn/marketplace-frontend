import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { MARKETPLACE_CONFIG, VALID_MARKETPLACES } from '../../utils/marketplaceConfig'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const { marketplace } = useParams()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const marketplaceColors = {
    shopee: 'text-orange-500 border-orange-500',
    tokopedia: 'text-green-600 border-green-600',
    lazada: 'text-blue-900 border-blue-900',
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/shopee" className="font-bold text-gray-800 text-lg shrink-0">
          🛒 MockMart
        </Link>

        {/* Marketplace switcher */}
        <div className="flex items-center gap-1">
          {VALID_MARKETPLACES.map((mp) => {
            const cfg = MARKETPLACE_CONFIG[mp]
            const isActive = marketplace === mp
            return (
              <NavLink
                key={mp}
                to={`/${mp}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors
                  ${isActive
                    ? `${marketplaceColors[mp]} bg-gray-50 border-b-2`
                    : 'text-gray-500 hover:text-gray-800'
                  }`}
              >
                {cfg.name}
              </NavLink>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              {marketplace && (
                <NavLink
                  to={`/${marketplace}/my-orders`}
                  className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block"
                >
                  My Orders
                </NavLink>
              )}
              <NavLink
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hidden sm:block"
              >
                {user.name || user.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-gray-800 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
