import { setProfile } from '../data/storage'

export default function ProfileGate({ onSelect }) {
  const choose = (profile) => {
    setProfile(profile)
    onSelect(profile)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="mb-10 text-center">
        <div
          className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl font-bold"
          style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
        >
          🍽️
        </div>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>Ración</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>¿Quién eres?</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <button
          onClick={() => choose('martin')}
          className="w-full py-4 rounded-2xl text-lg font-medium active:scale-95 transition"
          style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
        >
          🥊 Martín
        </button>
        <button
          onClick={() => choose('mama')}
          className="w-full py-4 rounded-2xl text-lg font-medium active:scale-95 transition"
          style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
        >
          👩 Mamá
        </button>
      </div>

      <p className="mt-10 text-xs text-center max-w-xs" style={{ color: 'var(--text-dim)' }}>
        Este plan es orientativo y no reemplaza a un profesional de salud.
      </p>
    </div>
  )
}
