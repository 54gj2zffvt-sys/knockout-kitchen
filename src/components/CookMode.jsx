import { useEffect, useRef, useState } from 'react'

const TIMER_PRESETS = [1, 3, 5, 10, 15]

export default function CookMode({ meal, onExit }) {
  const [step, setStep] = useState(0)
  const [seconds, setSeconds] = useState(null)
  const wakeLockRef = useRef(null)
  const intervalRef = useRef(null)

  // Mantener la pantalla encendida mientras se cocina (Screen Wake Lock API — soportado en
  // Safari iOS 16.4+ para apps agregadas a la pantalla de inicio). Si el navegador no lo soporta,
  // la app sigue funcionando igual, solo que la pantalla se puede apagar sola.
  useEffect(() => {
    let active = true
    async function lock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen')
        }
      } catch {
        // no soportado o rechazado — seguimos sin wake lock
      }
    }
    lock()
    const reacquire = () => {
      if (active && document.visibilityState === 'visible' && !wakeLockRef.current) lock()
    }
    document.addEventListener('visibilitychange', reacquire)
    return () => {
      active = false
      document.removeEventListener('visibilitychange', reacquire)
      wakeLockRef.current?.release?.().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (seconds === null) return
    if (seconds <= 0) {
      clearInterval(intervalRef.current)
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200])
      return
    }
    intervalRef.current = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(intervalRef.current)
  }, [seconds])

  const steps = meal.recipe
  const isLast = step === steps.length - 1
  const isFirst = step === 0

  const startTimer = (min) => setSeconds(min * 60)
  const stopTimer = () => setSeconds(null)

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <header className="flex items-center justify-between px-5 pt-6 pb-2 shrink-0">
        <button onClick={onExit} className="text-xl active:opacity-60" style={{ color: 'var(--text)' }}>✕</button>
        <p className="text-sm font-medium" style={{ color: 'var(--text-dim)' }}>{meal.name} · Modo cocina</p>
        <span className="w-5" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--accent)' }}>Paso {step + 1} de {steps.length}</p>
        <p className="text-3xl font-semibold leading-snug" style={{ color: 'var(--text)' }}>{steps[step]}</p>

        {seconds !== null ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="text-5xl font-bold tabular-nums" style={{ color: seconds <= 0 ? 'var(--warn)' : 'var(--accent)' }}>
              {formatTime(seconds)}
            </div>
            <button onClick={stopTimer} className="text-sm px-4 py-2 rounded-xl" style={{ background: 'var(--surface-2)', color: 'var(--text-dim)' }}>
              Cancelar temporizador
            </button>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-xs mb-2" style={{ color: 'var(--text-dim)' }}>¿Necesitas temporizador para este paso?</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {TIMER_PRESETS.map((m) => (
                <button
                  key={m}
                  onClick={() => startTimer(m)}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 px-5 pb-8 shrink-0" style={{ paddingBottom: 'calc(2rem + var(--safe-bottom))' }}>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
          className="flex-1 py-4 rounded-2xl text-lg font-medium disabled:opacity-30 active:scale-95 transition"
          style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
        >
          ← Anterior
        </button>
        {isLast ? (
          <button
            onClick={onExit}
            className="flex-1 py-4 rounded-2xl text-lg font-medium active:scale-95 transition"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Listo ✓
          </button>
        ) : (
          <button
            onClick={() => { setStep((s) => s + 1); setSeconds(null) }}
            className="flex-1 py-4 rounded-2xl text-lg font-medium active:scale-95 transition"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  )
}

function formatTime(total) {
  const t = Math.max(0, total)
  const m = Math.floor(t / 60)
  const s = t % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
