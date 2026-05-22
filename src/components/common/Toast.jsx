import { useUiStore } from '../../stores/uiStore'

const STYLES = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
}

export default function Toast() {
  const { toast, clearToast } = useUiStore()

  if (!toast) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div
        className={`${STYLES[toast.type] || STYLES.info} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[200px] max-w-sm`}
      >
        <span className="flex-1 text-sm font-medium">{toast.message}</span>
        <button onClick={clearToast} className="text-white/70 hover:text-white shrink-0">✕</button>
      </div>
    </div>
  )
}
