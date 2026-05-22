/**
 * Reusable button. Accepts a `colorClass` prop for marketplace theming.
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  colorClass = 'bg-gray-800 hover:bg-gray-700',
  className = '',
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
}) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: `text-white ${colorClass}`,
    outline: `border-2 bg-transparent ${colorClass.replace('bg-', 'border-').replace('hover:bg-', 'hover:border-')}`,
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}
