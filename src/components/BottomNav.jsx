const TABS = [
  { key: 'hoy', label: 'Hoy', icon: '🏠' },
  { key: 'semana', label: 'Semana', icon: '📅' },
  { key: 'cocina', label: 'Cocina', icon: '🍳' },
  { key: 'progreso', label: 'Progreso', icon: '📈' },
  { key: 'ajustes', label: 'Más', icon: '⋯' },
]

export default function BottomNav({ active, onChange, profile }) {
  const tabs = profile === 'mama' ? TABS : TABS.filter((t) => t.key !== 'cocina')
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around items-stretch"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'var(--safe-bottom)',
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className="flex-1 flex flex-col items-center gap-0.5 py-2 active:opacity-60"
          style={{ color: active === t.key ? 'var(--accent)' : 'var(--text-dim)' }}
        >
          <span className="text-xl leading-none">{t.icon}</span>
          <span className="text-[11px]">{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
