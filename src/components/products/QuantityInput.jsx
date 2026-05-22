export default function QuantityInput({ value, onChange, min = 1, max = 99, colorClass = 'border-gray-300' }) {
  const decrement = () => onChange(Math.max(min, value - 1))
  const increment = () => onChange(Math.min(max, value + 1))
  const handleChange = (e) => {
    const v = parseInt(e.target.value, 10)
    if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
  }

  return (
    <div className="flex items-center gap-0 border rounded-lg overflow-hidden w-fit">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors font-bold text-lg leading-none"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-12 text-center py-2 border-x text-sm font-semibold focus:outline-none"
      />
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors font-bold text-lg leading-none"
      >
        +
      </button>
    </div>
  )
}
