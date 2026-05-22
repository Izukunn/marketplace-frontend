import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

import RootLayout from '../layouts/RootLayout'
import MarketplaceLayout from '../pages/marketplace/MarketplaceLayout'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ProductListPage from '../pages/products/ProductListPage'
import ProductDetailPage from '../pages/products/ProductDetailPage'
import MyOrdersPage from '../pages/orders/MyOrdersPage'
import OrderDetailPage from '../pages/orders/OrderDetailPage'
import ProfilePage from '../pages/profile/ProfilePage'

/** Redirects to /login if not authenticated, preserving the intended path. */
function RequireAuth({ children }) {
  const { token } = useAuthStore()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected pages inside root layout */}
        <Route element={<RootLayout />}>
          {/* Redirect root to shopee */}
          <Route index element={<Navigate to="/shopee" replace />} />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />

          {/* Marketplace-scoped routes */}
          <Route path="/:marketplace" element={<MarketplaceLayout />}>
            {/* Product list — public */}
            <Route index element={<ProductListPage />} />

            {/* Product detail — public */}
            <Route path="products/:id" element={<ProductDetailPage />} />

            {/* Orders — protected */}
            <Route
              path="my-orders"
              element={
                <RequireAuth>
                  <MyOrdersPage />
                </RequireAuth>
              }
            />
            <Route
              path="orders/:id"
              element={
                <RequireAuth>
                  <OrderDetailPage />
                </RequireAuth>
              }
            />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/shopee" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
