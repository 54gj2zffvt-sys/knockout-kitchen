import { useEffect, useState } from 'react'

export default function Splash({ onDone, minMs = 900 }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), minMs)
    const doneTimer = setTimeout(onDone, minMs + 350)
    return () => { clearTimeout(leaveTimer); clearTimeout(doneTimer) }
  }, [minMs, onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'var(--bg)',
        backgroundImage: 'var(--bg-gradient)',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.35s ease',
      }}
    >
      <div
        className="w-24 h-24 rounded-[28px] flex items-center justify-center"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          animation: 'splash-pulse 1.1s ease-in-out infinite',
        }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="5" />
          <circle
            cx="28" cy="28" r="22" fill="none" stroke="var(--accent)" strokeWidth="5"
            strokeDasharray="138" strokeDashoffset="34" strokeLinecap="round"
            transform="rotate(-90 28 28)"
          />
        </svg>
      </div>
      <style>{`
        @keyframes splash-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>
    </div>
  )
}
