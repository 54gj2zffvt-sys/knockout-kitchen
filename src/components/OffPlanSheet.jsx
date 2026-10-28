import { useState } from 'react'
import { OFFPLAN_ITEMS } from '../data/offplan'

export default function OffPlanSheet({ onAdd, onClose }) {
  const [picked, setPicked] = useState(null)

  const confirm = () => {
    if (!picked) return
    onAdd(picked)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl p-5 max-h-[80vh] overflow-auto"
        style={{ background: 'var(--surface)', paddingBottom: 'calc(1.5rem + var(--safe-bottom))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: 'var(--border)' }} />
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Comí fuera del plan</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>Elige lo más parecido — son calorías aproximadas, no exactas.</p>
        <div className="flex flex-col gap-2 mb-4">
          {OFFPLAN_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setPicked(item)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left"
              style={{
                background: picked?.id === item.id ? 'var(--accent)' : 'var(--surface-2)',
                color: picked?.id === item.id ? 'var(--accent-ink)' : 'var(--text)',
              }}
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-xs">~{item.kcal} kcal</span>
            </button>
          ))}
        </div>
        <button
          onClick={confirm}
          disabled={!picked}
          className="w-full py-3 rounded-2xl text-sm font-medium disabled:opacity-40 active:scale-95 transition"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          Agregar al día
        </button>
      </div>
    </div>
  )
}
