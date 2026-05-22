import { useMarketplace } from '../../hooks/useMarketplace'

const EMOJI = { shopee: '🟠', tokopedia: '🟢', lazada: '🔵' }

export default function MarketplaceHeader() {
  const { marketplace, config } = useMarketplace()

  return (
    <div className={`${config.headerBg} text-white py-3 px-4`}>
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <span className="text-2xl">{EMOJI[marketplace]}</span>
        <div>
          <h1 className="font-bold text-xl leading-tight">{config.name}</h1>
          <p className="text-xs opacity-75">Mock Marketplace Simulator</p>
        </div>
      </div>
    </div>
  )
}
