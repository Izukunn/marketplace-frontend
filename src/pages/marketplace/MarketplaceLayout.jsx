import { Outlet } from 'react-router-dom'
import { useMarketplace } from '../../hooks/useMarketplace'
import MarketplaceHeader from '../../components/common/MarketplaceHeader'

export default function MarketplaceLayout() {
  const { config } = useMarketplace()

  return (
    <div className={`min-h-screen ${config.bgLight}`}>
      <MarketplaceHeader />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  )
}
