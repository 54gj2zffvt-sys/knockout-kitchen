import { useState } from 'react'
import { SHOPPING_LIST, PREP_TIPS } from '../data/shopping'
import { getShoppingChecks, toggleShoppingCheck, todayISO } from '../data/storage'
import { getPlanForDate } from '../data/plan'
import { photoForMeal } from '../data/photos'

export default function CocinaScreen({ onOpenMeal, onCook }) {
  const [checks, setChecks] = useState(getShoppingChecks())

  const toggle = (id) => setChecks(toggleShoppingCheck(id))

  const totalItems = SHOPPING_LIST.reduce((n, c) => n + c.items.length, 0)
  const doneItems = Object.values(checks).filter(Boolean).length

  const todayPlan = getPlanForDate(todayISO())
  const cookable = (todayPlan?.type !== 'viaje' ? todayPlan?.meals : [])?.filter((m) => m.recipe?.length > 0) ?? []

  return (
    <div className="px-5 pt-6 pb-28">
      <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Cocina</h2>
      <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>
        Lista de compras — {doneItems}/{totalItems} marcados · ~$40-45 estimado la semana
      </p>

      {cookable.length > 0 && (
        <section className="mb-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>¿Qué cocinar hoy?</h3>
          <div className="flex flex-col gap-2">
            {cookable.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-2xl p-2 pr-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <img src={photoForMeal(m)} alt={m.name} className="w-12 h-12 rounded-xl object-cover food-img" />
                <button onClick={() => onOpenMeal?.(m)} className="flex-1 text-left">
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{m.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{m.time} · {m.macros.kcal} kcal</p>
                </button>
                <button
                  onClick={() => onCook?.(m)}
                  className="text-xs px-3 py-2 rounded-lg font-medium active:scale-95 transition shrink-0"
                  style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                >
                  👨‍🍳 Cocinar
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {SHOPPING_LIST.map((cat) => (
        <section key={cat.category} className="mb-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>{cat.category}</h3>
          <div className="rounded-2xl divide-y" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {cat.items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs"
                  style={{
                    background: checks[item.id] ? 'var(--accent)' : 'var(--surface-2)',
                    color: 'var(--accent-ink)',
                    border: checks[item.id] ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {checks[item.id] ? '✓' : ''}
                </span>
                <span className="flex-1" style={{ color: checks[item.id] ? 'var(--text-dim)' : 'var(--text)', textDecoration: checks[item.id] ? 'line-through' : 'none' }}>
                  {item.name} <span className="text-xs" style={{ color: 'var(--text-dim)' }}>({item.qty})</span>
                </span>
                <span className="text-xs shrink-0" style={{ color: 'var(--text-dim)' }}>{item.price}</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>Preparación por adelantado</h3>
        <div className="flex flex-col gap-2">
          {PREP_TIPS.map((tip, i) => (
            <div key={i} className="text-sm px-4 py-3 rounded-xl" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>
              {tip}
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs mt-4" style={{ color: 'var(--text-dim)' }}>
        ⚠️ Precios estimados, no reales — ajústalos con lo que veas en la tienda.
      </p>
    </div>
  )
}
