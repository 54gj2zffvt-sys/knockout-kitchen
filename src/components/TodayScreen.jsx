import { useEffect, useState } from 'react'
import { getPlanForDate, adjustedTarget, hydrationTarget } from '../data/plan'
import { getMealStatus, setMealStatus, getWater, addWater, todayISO, getOffPlan, addOffPlan, getAdjustment, getDayOverride, setDayOverride } from '../data/storage'
import { photoForMeal } from '../data/photos'
import ProgressRing, { MiniBar } from './ProgressRing'
import OffPlanSheet from './OffPlanSheet'
import DayOverrideSheet from './DayOverrideSheet'

const STATUS_WEIGHT = { full: 1, half: 0.5, none: 0 }
const STATUS_LABEL = { full: 'La comí', half: 'Comí la mitad', none: 'No la comí' }

export default function TodayScreen({ dateISO = todayISO(), onOpenMeal }) {
  const [statuses, setStatuses] = useState({})
  const [water, setWater] = useState(0)
  const [offPlan, setOffPlan] = useState([])
  const [showOffPlan, setShowOffPlan] = useState(false)
  const [showOverride, setShowOverride] = useState(false)
  const [override, setOverride] = useState(null)

  useEffect(() => {
    setStatuses(getMealStatus(dateISO))
    setWater(getWater(dateISO))
    setOffPlan(getOffPlan(dateISO))
    setOverride(getDayOverride(dateISO))
  }, [dateISO])

  const plan = getPlanForDate(dateISO, override)

  if (!plan) {
    return (
      <Centered>
        <p style={{ color: 'var(--text-dim)' }}>No hay plan cargado para esta fecha todavía.</p>
      </Centered>
    )
  }

  if (plan.type === 'viaje') {
    return (
      <Centered>
        <div className="text-5xl mb-3">✈️</div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Modo viaje</h2>
        <p className="text-sm max-w-xs" style={{ color: 'var(--text-dim)' }}>
          Hoy no hay recetas fijas — usa el método del plato (proteína, carbo, vegetales) y la guía de
          hidratación. Revisa la sección "Más → Modo viaje".
        </p>
      </Centered>
    )
  }

  const multiplier = getAdjustment().multiplier
  const target = adjustedTarget(plan.type, multiplier)
  const totals = plan.meals.reduce(
    (acc, m) => {
      const w = STATUS_WEIGHT[statuses[m.id]] ?? 0
      acc.kcal += m.macros.kcal * w
      acc.protein += m.macros.protein * w
      acc.carbs += m.macros.carbs * w
      acc.fat += m.macros.fat * w
      return acc
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )
  offPlan.forEach((item) => {
    totals.kcal += item.kcal
    totals.protein += item.protein
    totals.carbs += item.carbs
    totals.fat += item.fat
  })

  const allMarked = plan.meals.every((m) => statuses[m.id])
  const waterTarget = hydrationTarget(plan.type)

  const setStatus = (mealId, status) => {
    setMealStatus(dateISO, mealId, status)
    setStatuses((s) => ({ ...s, [mealId]: status }))
  }

  const bumpWater = (amount) => setWater(addWater(dateISO, amount))
  const addOffPlanItem = (item) => setOffPlan(addOffPlan(dateISO, item))
  const pickOverride = (type) => {
    setDayOverride(dateISO, type)
    setOverride(type)
    setShowOverride(false)
  }

  return (
    <div className="pb-28">
      <header className="px-5 pt-6 pb-2">
        <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{formatDate(dateISO)}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <button
            onClick={() => setShowOverride(true)}
            className="text-xs px-2 py-0.5 rounded-full font-medium active:opacity-70"
            style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
          >
            {target.label} {override && '✎'}
          </button>
          {multiplier !== 1 && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--surface-2)', color: 'var(--text-dim)' }}>
              ajustado {multiplier > 1 ? '+' : ''}{Math.round((multiplier - 1) * 100)}%
            </span>
          )}
          {plan.freeDay && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--surface-2)', color: 'var(--mid)' }}>
              🎉 día libre/golosina
            </span>
          )}
        </div>
      </header>

      <div className="flex justify-center py-4">
        <ProgressRing value={totals.kcal} max={target.kcal} size={210} stroke={16}>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{Math.round(totals.kcal)}</div>
            <div className="text-xs" style={{ color: 'var(--text-dim)' }}>de {target.kcal} kcal</div>
          </div>
        </ProgressRing>
      </div>

      <div className="flex gap-3 px-5 mb-5">
        <MiniBar label="Proteína" value={totals.protein} max={target.protein} color="var(--protein)" />
        <MiniBar label="Carbos" value={totals.carbs} max={target.carbs} color="var(--carbs)" />
        <MiniBar label="Grasa" value={totals.fat} max={target.fat} color="var(--fat)" />
      </div>

      <section className="px-5 mb-5">
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>💧 Agua</p>
            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{water.toFixed(2)} / {waterTarget} L</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => bumpWater(0.25)} className="w-10 h-10 rounded-full text-sm font-semibold active:scale-90" style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>+¼</button>
            <button onClick={() => bumpWater(0.5)} className="w-10 h-10 rounded-full text-sm font-semibold active:scale-90" style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>+½</button>
          </div>
        </div>
      </section>

      <section className="px-5">
        <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>Comidas de hoy</h3>
        <div className="flex flex-col gap-2">
          {plan.meals.map((m) => (
            <MealRow key={m.id} meal={m} status={statuses[m.id]} onStatus={(s) => setStatus(m.id, s)} onOpen={() => onOpenMeal(m, dateISO)} />
          ))}
        </div>
      </section>

      {offPlan.length > 0 && (
        <section className="px-5 mt-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>Fuera del plan hoy</h3>
          <div className="flex flex-col gap-1.5">
            {offPlan.map((item, i) => (
              <div key={i} className="flex justify-between px-4 py-2 rounded-xl text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>
                <span>{item.name}</span>
                <span style={{ color: 'var(--text-dim)' }}>~{item.kcal} kcal</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 mt-5">
        <button
          onClick={() => setShowOffPlan(true)}
          className="w-full py-3 rounded-2xl text-sm font-medium active:scale-95 transition"
          style={{ background: 'var(--surface-2)', color: 'var(--text-dim)' }}
        >
          + Comí fuera del plan
        </button>
      </section>

      {allMarked && (
        <section className="px-5 mt-5">
          <div className="rounded-2xl p-4 text-center" style={{ background: 'var(--surface-2)' }}>
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              {totals.kcal >= target.kcal * 0.9 ? '💪 Buen día, cumpliste el plan.' : 'Día registrado — faltó un poco para la meta, sin problema.'}
            </p>
          </div>
        </section>
      )}

      {showOffPlan && <OffPlanSheet onAdd={addOffPlanItem} onClose={() => setShowOffPlan(false)} />}
      {showOverride && (
        <DayOverrideSheet
          currentType={plan.type}
          originalType={plan.originalType}
          onPick={pickOverride}
          onClose={() => setShowOverride(false)}
        />
      )}
    </div>
  )
}

function MealRow({ meal, status, onStatus, onOpen }) {
  return (
    <div className="rounded-2xl p-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <button onClick={onOpen} className="w-full flex items-center gap-3 text-left">
        <img
          src={photoForMeal(meal)} alt={meal.name}
          className="w-12 h-12 rounded-xl object-cover shrink-0 food-img"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-medium truncate" style={{ color: 'var(--text)' }}>{meal.name}</span>
            <span className="text-xs shrink-0" style={{ color: 'var(--text-dim)' }}>{meal.time}</span>
          </div>
          <p className="text-xs truncate" style={{ color: 'var(--text-dim)' }}>{meal.macros.kcal} kcal · {meal.foods.map((f) => f.name).join(', ')}</p>
        </div>
      </button>
      <div className="flex gap-1.5 mt-2">
        {Object.entries(STATUS_LABEL).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onStatus(key)}
            className="flex-1 text-xs py-1.5 rounded-lg font-medium active:scale-95 transition"
            style={{
              background: status === key ? 'var(--accent)' : 'var(--surface-2)',
              color: status === key ? 'var(--accent-ink)' : 'var(--text-dim)',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Centered({ children }) {
  return <div className="h-[80vh] flex flex-col items-center justify-center text-center px-6">{children}</div>
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })
}
