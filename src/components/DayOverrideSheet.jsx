import { DAY_TARGETS } from '../data/plan'

export default function DayOverrideSheet({ currentType, originalType, onPick, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl p-5"
        style={{ background: 'var(--surface)', paddingBottom: 'calc(1.5rem + var(--safe-bottom))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: 'var(--border)' }} />
        <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>¿Cambió el entrenamiento hoy?</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>
          Por un examen, un cambio de horario, etc. — elige el tipo real de hoy y la comida se ajusta sola.
        </p>
        <div className="flex flex-col gap-2 mb-3">
          {Object.entries(DAY_TARGETS).map(([key, info]) => (
            <button
              key={key}
              onClick={() => onPick(key)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left"
              style={{
                background: currentType === key ? 'var(--accent)' : 'var(--surface-2)',
                color: currentType === key ? 'var(--accent-ink)' : 'var(--text)',
              }}
            >
              <span className="font-medium">{info.label}</span>
              <span className="text-xs">{info.kcal} kcal</span>
            </button>
          ))}
        </div>
        {currentType !== originalType && (
          <button
            onClick={() => onPick(null)}
            className="w-full py-3 rounded-2xl text-sm font-medium"
            style={{ background: 'var(--surface-2)', color: 'var(--text-dim)' }}
          >
            Volver al plan original ({DAY_TARGETS[originalType]?.label})
          </button>
        )}
      </div>
    </div>
  )
}
