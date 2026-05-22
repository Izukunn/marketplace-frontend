export default function LoadingSpinner({ size = 'md', color = 'text-gray-400', fullPage = false }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }

  const spinner = (
    <svg
      className={`animate-spin ${sizes[size]} ${color}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return <div className="flex justify-center py-8">{spinner}</div>
}
