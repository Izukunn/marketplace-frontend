/**
 * Reusable input field with label and error display.
 */
export default function Input({
  label,
  id,
  error,
  ringColor = 'focus:ring-blue-400',
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`input-base ${ringColor} ${error ? 'border-red-400 focus:ring-red-300' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
