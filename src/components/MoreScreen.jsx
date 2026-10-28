import { useState } from 'react'
import { getTheme, setTheme as persistTheme, setProfile, getNotifPrefs, setNotifPrefs, todayISO } from '../data/storage'
import { PHOTO_CREDITS } from '../data/photos'
import { requestPermission, scheduleMealReminders, scheduleWaterReminder } from '../data/notifications'
import { getPlanForDate } from '../data/plan'
import { isSyncConfigured } from '../data/sync'

export default function MoreScreen({ profile, onChangeProfile, onOpenTravel }) {
  const [theme, setThemeState] = useState(getTheme())
  const [notifs, setNotifs] = useState(getNotifPrefs())
  const [permState, setPermState] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'unsupported')

  const toggleNotif = async (key) => {
    if (permState !== 'granted') {
      const result = await requestPermission()
      setPermState(result)
      if (result !== 'granted') return
    }
    const next = { ...notifs, [key]: !notifs[key] }
    setNotifPrefs(next)
    setNotifs(next)
    if (key === 'comidas' && next.comidas) {
      const plan = getPlanForDate(todayISO())
      if (plan && plan.type !== 'viaje') scheduleMealReminders(plan.meals)
    }
    if (key === 'agua' && next.agua) {
      scheduleWaterReminder(90)
    }
  }

  const applyTheme = (t) => {
    persistTheme(t)
    setThemeState(t)
    if (t === 'auto') document.documentElement.removeAttribute('data-theme')
    else document.documentElement.setAttribute('data-theme', t)
  }

  const logout = () => {
    setProfile(null)
    onChangeProfile(null)
  }

  return (
    <div className="px-5 pt-6 pb-28">
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Más</h2>

      <Section title="Apariencia">
        <div className="flex gap-2">
          {[['auto', '⚙️ Auto'], ['light', '☀️ Claro'], ['dark', '🌙 Oscuro']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => applyTheme(key)}
              className="flex-1 py-2 rounded-xl text-xs font-medium"
              style={{ background: theme === key ? 'var(--accent)' : 'var(--surface-2)', color: theme === key ? 'var(--accent-ink)' : 'var(--text)' }}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Modo viaje">
        <button onClick={onOpenTravel} className="w-full text-left px-4 py-3 rounded-xl text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>
          Ver guía de modo viaje (2-9 nov) →
        </button>
      </Section>

      <Section title="Recordatorios">
        <div className="flex flex-col gap-2 mb-2">
          <Toggle label="Comidas" checked={notifs.comidas} onClick={() => toggleNotif('comidas')} />
          <Toggle label="Agua (cada 90 min)" checked={notifs.agua} onClick={() => toggleNotif('agua')} />
        </div>
        {permState === 'denied' && (
          <p className="text-xs px-1" style={{ color: 'var(--warn)' }}>Las notificaciones están bloqueadas para esta app — actívalas en Ajustes del iPhone → Ración → Notificaciones.</p>
        )}
        <p className="text-xs px-1 mt-2" style={{ color: 'var(--text-dim)' }}>
          Honesto: esto funciona bien mientras la app está abierta o recién en segundo plano. El iPhone no deja avisar a una hora exacta con la app completamente cerrada sin un servidor que las dispare — tener Supabase conectado no activa esto solo, haría falta programar ese envío aparte más adelante. Mientras tanto, para una alarma 100% confiable, usar también los Recordatorios nativos del iPhone a esas horas es la alternativa más segura.
        </p>
      </Section>

      <Section title="Sincronización">
        <p className="text-sm px-1" style={{ color: isSyncConfigured() ? 'var(--ok)' : 'var(--text-dim)' }}>
          {isSyncConfigured() ? '✓ Conectada — los cambios se comparten entre los dos teléfonos.' : 'No configurada — cada teléfono guarda solo localmente.'}
        </p>
      </Section>

      <Section title="Suplementos">
        <p className="text-sm px-1" style={{ color: 'var(--text-dim)' }}>
          Ninguno activo por ahora. Si retoman la creatina u otro, se agrega aquí con dosis y horario.
        </p>
      </Section>

      <Section title="Perfil">
        <p className="text-sm px-1 mb-2" style={{ color: 'var(--text-dim)' }}>Conectado como: {profile === 'martin' ? 'Martín' : 'Mamá'}</p>
        <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>
          Cambiar de perfil
        </button>
      </Section>

      <Section title="Créditos de fotos">
        <p className="text-xs px-1 mb-2" style={{ color: 'var(--text-dim)' }}>Fotos gratuitas de Pexels, usadas por categoría de alimento.</p>
        <div className="flex flex-col gap-1">
          {PHOTO_CREDITS.map((c) => (
            <div key={c.file} className="text-xs px-1" style={{ color: 'var(--text-dim)' }}>
              {c.file.replace('.jpg', '')} — foto de {c.author} en Pexels
            </div>
          ))}
        </div>
      </Section>

      <Section title="Aviso">
        <p className="text-sm px-1" style={{ color: 'var(--text-dim)' }}>
          Este plan es orientativo, basado en evidencia pero elaborado como proyecto de prueba. No reemplaza a un nutricionista deportivo ni a un médico. Cualquier señal de salud fuera de lo normal debe consultarse con un profesional.
        </p>
      </Section>

      <p className="text-center text-xs mt-6" style={{ color: 'var(--text-dim)' }}>Ración · v1 (Etapas 1-3)</p>
    </div>
  )
}

function Toggle({ label, checked, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: 'var(--surface-2)' }}>
      <span className="text-sm" style={{ color: 'var(--text)' }}>{label}</span>
      <span
        className="w-10 h-6 rounded-full relative transition"
        style={{ background: checked ? 'var(--accent)' : 'var(--border)' }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
          style={{ background: '#fff', left: checked ? '18px' : '2px' }}
        />
      </span>
    </button>
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
