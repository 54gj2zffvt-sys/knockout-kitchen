import { useMemo, useState } from 'react'
import { todayISO, getWeights, addWeight, getCheckins, addCheckin, getAdjustment, applyAdjustment } from '../data/storage'
import { weekStart, computeWeekStats, computeStreak, suggestAdjustment, checkAlerts, generateTips } from '../data/reports'
import Sparkline from './Sparkline'

function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + n)
  const tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return tz.toISOString().slice(0, 10)
}

const FEELING_LABELS = ['', '😣 Muy mal', '😓 Mal', '🙂 Normal', '😄 Bien', '🤩 Excelente']

export default function ProgresoScreen() {
  const today = todayISO()
  const [weights, setWeights] = useState(getWeights())
  const [checkins, setCheckins] = useState(getCheckins())
  const [adjustment, setAdjustment] = useState(getAdjustment())
  const [kg, setKg] = useState('')
  const [feeling, setFeeling] = useState('bien')
  const [showCheckin, setShowCheckin] = useState(false)
  const [tab, setTab] = useState('semana') // 'semana' | 'peso' | 'bienestar'

  const curStart = weekStart(today)

  const weeks = useMemo(() => {
    // últimas semanas con datos (hasta 6), desde la primera vez que hay peso registrado
    const firstDate = weights[0]?.date ?? today
    const firstStart = weekStart(firstDate)
    const list = []
    let cursor = firstStart
    while (cursor <= curStart && list.length < 8) {
      list.push(computeWeekStats(cursor))
      cursor = addDays(cursor, 7)
    }
    return list
    // checkins/adjustment no se leen aquí directamente, pero sí dentro de computeWeekStats
    // (lee de localStorage) — se mantienen como dependencias para forzar el recálculo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weights, checkins, adjustment, curStart, today])

  const current = weeks[weeks.length - 1] ?? computeWeekStats(curStart)
  const previous = weeks.length >= 2 ? weeks[weeks.length - 2] : null
  const first = weeks[0] ?? current

  const streak = computeStreak(today)
  const alerts = checkAlerts(weeks, checkins)
  const tips = generateTips(current)
  const adjustmentSuggestion = suggestAdjustment(weeks, alerts, adjustment.history)

  const saveWeight = () => {
    if (!kg) return
    const entry = { date: today, kg: parseFloat(kg), feeling }
    setWeights(addWeight(entry))
    setKg('')
  }

  const acceptAdjustment = () => {
    const pct = adjustmentSuggestion.action === 'increase' ? adjustmentSuggestion.pct : -adjustmentSuggestion.pct
    const next = applyAdjustment(adjustment.multiplier * (1 + pct / 100), adjustmentSuggestion.reason)
    setAdjustment(next)
  }

  const weightSeries = weights.map((w) => w.kg)

  return (
    <div className="px-5 pt-6 pb-28">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Progreso</h2>
        {streak > 0 && (
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>
            🔥 {streak} {streak === 1 ? 'día' : 'días'} seguidos
          </span>
        )}
      </div>
      <p className="text-xs mb-4" style={{ color: 'var(--text-dim)' }}>Semana del {fmt(curStart)}</p>

      {alerts.length > 0 && (
        <section className="mb-5">
          {alerts.map((a, i) => (
            <div key={i} className="rounded-2xl p-4 mb-2 text-sm" style={{ background: 'color-mix(in srgb, var(--danger) 14%, var(--surface))', color: 'var(--danger)', border: '1px solid color-mix(in srgb, var(--danger) 35%, var(--border))' }}>
              ⚠️ {a}
            </div>
          ))}
        </section>
      )}

      {adjustmentSuggestion && adjustmentSuggestion.action !== 'none' && (
        <section className="mb-5">
          <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', border: '1.5px solid var(--accent)' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
              Sugerencia: {adjustmentSuggestion.action === 'increase' ? 'subir' : 'bajar'} calorías {adjustmentSuggestion.pct}%
            </p>
            <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>{adjustmentSuggestion.reason}</p>
            <div className="flex gap-2">
              <button onClick={acceptAdjustment} className="flex-1 py-2 rounded-xl text-sm font-medium" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>Aceptar</button>
              <button className="flex-1 py-2 rounded-xl text-sm font-medium" style={{ background: 'var(--surface-2)', color: 'var(--text-dim)' }}>Ahora no</button>
            </div>
          </div>
        </section>
      )}

      {/* Tabs internos */}
      <div className="flex gap-2 mb-5">
        {[['semana', 'Esta semana'], ['peso', 'Peso'], ['bienestar', 'Bienestar']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex-1 py-2 rounded-xl text-xs font-medium"
            style={{ background: tab === key ? 'var(--accent)' : 'var(--surface-2)', color: tab === key ? 'var(--accent-ink)' : 'var(--text)' }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'semana' && (
        <>
          <Section title="Cumplimiento">
            <Row label="Comidas marcadas" value={`${current.pctMealsDone}%`} />
            <Row label="Días dentro del objetivo" value={`${current.daysCompliant}/${current.daysWithPlan}`} />
            <Row label="Comidas fuera del plan" value={current.offPlanCount} />
          </Section>

          <Section title="Nutrición (promedio diario)">
            <Row label="Calorías" value={`${current.avgKcal} / ${current.avgTargetKcal} kcal`} />
            <Row label="Proteína" value={`${current.avgProtein} / ${current.avgTargetProtein} g`} />
            <Row label="Carbohidratos" value={`${current.avgCarbs} / ${current.avgTargetCarbs} g`} />
            <Row label="Grasa" value={`${current.avgFat} / ${current.avgTargetFat} g`} />
            <Row label="Agua" value={`${current.avgWater} / ${current.avgWaterTarget} L`} />
          </Section>

          {previous && (
            <Section title="Comparación">
              <Row label="vs. semana anterior (peso)" value={deltaLabel(current.weightAvg, previous.weightAvg)} />
              <Row label="vs. inicio del plan (peso)" value={deltaLabel(current.weightAvg, first.weightAvg)} />
              <Row label="vs. semana anterior (cumplimiento)" value={`${current.pctMealsDone - previous.pctMealsDone >= 0 ? '+' : ''}${current.pctMealsDone - previous.pctMealsDone} pts`} />
            </Section>
          )}

          <Section title="Recomendaciones de la semana">
            <ul className="flex flex-col gap-2">
              {tips.map((t, i) => (
                <li key={i} className="text-sm px-4 py-3 rounded-xl" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>{t}</li>
              ))}
            </ul>
          </Section>

          <MonthSummaryButton weeks={weeks} />
        </>
      )}

      {tab === 'peso' && (
        <>
          <Section title="Tendencia de peso">
            {weightSeries.length >= 2 ? (
              <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <Sparkline points={weightSeries} />
                <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--text-dim)' }}>
                  <span>{weights[0].kg} kg</span>
                  <span>{weights[weights.length - 1].kg} kg</span>
                </div>
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>Registra al menos 2 pesos para ver la tendencia.</p>
            )}
          </Section>

          <Section title="Registrar peso de hoy (en ayunas)">
            <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex gap-2">
                <input
                  type="number" step="0.1" inputMode="decimal" placeholder="76.4"
                  value={kg} onChange={(e) => setKg(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-sm"
                  style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
                />
                <select
                  value={feeling} onChange={(e) => setFeeling(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm"
                  style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
                >
                  <option value="genial">😄 Genial</option>
                  <option value="bien">🙂 Bien</option>
                  <option value="cansado">😓 Cansado</option>
                  <option value="mal">😣 Mal</option>
                </select>
              </div>
              <button onClick={saveWeight} className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                Guardar
              </button>
            </div>
          </Section>

          {weights.length > 0 && (
            <Section title="Historial">
              <div className="rounded-2xl divide-y" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {weights.slice().reverse().slice(0, 10).map((w, i) => (
                  <div key={i} className="flex justify-between px-4 py-3 text-sm" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>
                    <span>{w.date}</span>
                    <span>{w.kg} kg</span>
                    <span style={{ color: 'var(--text-dim)' }}>{w.feeling}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </>
      )}

      {tab === 'bienestar' && (
        <>
          <Section title="Revisión del domingo">
            <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>
              Cada domingo: peso, energía, hambre, sueño y rendimiento — 5 preguntas rápidas.
            </p>
            <button
              onClick={() => setShowCheckin(true)}
              className="w-full py-3 rounded-2xl text-sm font-medium active:scale-95 transition"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              {current.checkin ? 'Editar chequeo de esta semana' : 'Hacer el chequeo de esta semana'}
            </button>
          </Section>

          {checkins.length > 0 && (
            <Section title="Historial de bienestar">
              <div className="rounded-2xl divide-y" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {checkins.slice().reverse().slice(0, 8).map((c, i) => (
                  <div key={i} className="px-4 py-3 text-sm" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{c.date}</span>
                      <span style={{ color: 'var(--text-dim)' }}>{c.peso} kg</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
                      Energía {c.energia}/5 · Hambre {c.hambre}/5 · Sueño {c.sueno}/5 · Rendimiento {c.rendimiento}/5
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </>
      )}

      {showCheckin && (
        <CheckinForm
          weekStartISO={curStart}
          onClose={() => setShowCheckin(false)}
          onSave={(entry) => { setCheckins(addCheckin(entry)); setShowCheckin(false) }}
        />
      )}
    </div>
  )
}

function CheckinForm({ weekStartISO, onClose, onSave }) {
  const [form, setForm] = useState({ peso: '', energia: 3, hambre: 3, sueno: 3, rendimiento: 3 })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const save = () => {
    onSave({ date: todayISO(), weekStart: weekStartISO, peso: parseFloat(form.peso) || null, energia: form.energia, hambre: form.hambre, sueno: form.sueno, rendimiento: form.rendimiento })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div className="w-full rounded-t-3xl p-5 max-h-[85vh] overflow-auto" style={{ background: 'var(--surface)', paddingBottom: 'calc(1.5rem + var(--safe-bottom))' }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: 'var(--border)' }} />
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Chequeo semanal</h3>

        <label className="text-xs" style={{ color: 'var(--text-dim)' }}>Peso de hoy (kg)</label>
        <input
          type="number" step="0.1" inputMode="decimal" placeholder="76.4"
          value={form.peso} onChange={(e) => set('peso', e.target.value)}
          className="w-full px-3 py-2 rounded-xl text-sm mb-4 mt-1"
          style={{ background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
        />

        {[['energia', '¿Cómo anda la energía?'], ['hambre', '¿Cómo anda el hambre?'], ['sueno', '¿Cómo durmió esta semana?'], ['rendimiento', '¿Cómo rindió entrenando?']].map(([key, label]) => (
          <div key={key} className="mb-4">
            <p className="text-xs mb-2" style={{ color: 'var(--text-dim)' }}>{label}</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => set(key, n)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium"
                  style={{ background: form[key] === n ? 'var(--accent)' : 'var(--surface-2)', color: form[key] === n ? 'var(--accent-ink)' : 'var(--text-dim)' }}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-[10px] mt-1 text-center" style={{ color: 'var(--text-dim)' }}>{FEELING_LABELS[form[key]]}</p>
          </div>
        ))}

        <button onClick={save} className="w-full py-3 rounded-2xl text-sm font-medium active:scale-95 transition" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          Guardar chequeo
        </button>
      </div>
    </div>
  )
}

function MonthSummaryButton({ weeks }) {
  const [copied, setCopied] = useState(false)

  const buildText = () => {
    const lines = ['Resumen del mes — Ración (Martín)', '']
    weeks.forEach((w) => {
      lines.push(`Semana del ${fmt(w.startISO)}: ${w.pctMealsDone}% comidas, ${w.avgKcal}/${w.avgTargetKcal} kcal/día${w.weightAvg ? `, peso promedio ${w.weightAvg}kg` : ''}`)
    })
    return lines.join('\n')
  }

  const share = async () => {
    const text = buildText()
    if (navigator.share) {
      try { await navigator.share({ text, title: 'Resumen del mes' }); return } catch { /* cancelado */ }
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard no disponible */ }
  }

  return (
    <section className="mb-5">
      <button onClick={share} className="w-full py-3 rounded-2xl text-sm font-medium active:scale-95 transition" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>
        {copied ? '✓ Copiado' : '📤 Generar resumen del mes'}
      </button>
      <p className="text-[11px] mt-1 text-center" style={{ color: 'var(--text-dim)' }}>Se comparte o se copia para pasárselo al nutriólogo.</p>
    </section>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>{title}</h3>
      {children}
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between px-4 py-2.5 rounded-xl mb-1.5 text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function deltaLabel(a, b) {
  if (a == null || b == null) return '—'
  const d = +(a - b).toFixed(1)
  if (d === 0) return 'sin cambio'
  return `${d > 0 ? '+' : ''}${d} kg`
}

function fmt(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })
}
