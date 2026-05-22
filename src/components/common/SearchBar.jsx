import { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = 'Search products...', ringColor = 'focus:ring-gray-400', initialValue = '' }) {
  const [value, setValue] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`input-base flex-1 ${ringColor}`}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        Search
      </button>
    </form>
  )
}
