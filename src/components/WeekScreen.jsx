import { getPlanForDate, DAY_TARGETS } from '../data/plan'
import { todayISO, getDayOverride } from '../data/storage'

const TYPE_EMOJI = { alto: '🔥', normal: '💪', descanso: '🧘', viaje: '✈️' }

function startOfWeek(dateISO) {
  const d = new Date(dateISO + 'T00:00:00')
  const day = d.getDay() // 0 = domingo
  const diff = day === 0 ? -6 : 1 - day // llevar a lunes
  d.setDate(d.getDate() + diff)
  return d
}

function toISO(d) {
  return d.toISOString().slice(0, 10)
}

export default function WeekScreen({ referenceDate = todayISO(), onSelectDay }) {
  const monday = startOfWeek(referenceDate)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return toISO(d)
  })

  return (
    <div className="px-5 pt-6 pb-28">
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Esta semana</h2>
      <div className="flex flex-col gap-2">
        {days.map((iso) => {
          const override = getDayOverride(iso)
          const plan = getPlanForDate(iso, override)
          const type = plan?.type ?? null
          const isToday = iso === todayISO()
          return (
            <button
              key={iso}
              onClick={() => onSelectDay(iso)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left active:scale-[0.98] transition"
              style={{
                background: isToday ? 'var(--surface-2)' : 'var(--surface)',
                border: isToday ? '1.5px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              <div>
                <p className="font-medium" style={{ color: 'var(--text)' }}>{formatDay(iso)}</p>
                <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-dim)' }}>
                  {type ? (type === 'viaje' ? 'Modo viaje' : DAY_TARGETS[type].label) : 'Sin plan'}
                  {override && <span style={{ color: 'var(--accent)' }}>✎ ajustado</span>}
                  {plan?.freeDay && <span style={{ color: 'var(--mid)' }}>🎉 libre</span>}
                </p>
              </div>
              <span className="text-2xl">{type ? TYPE_EMOJI[type] : '—'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatDay(iso) {
  const d = new Date(iso + 'T00:00:00')
  const label = d.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'short' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}
