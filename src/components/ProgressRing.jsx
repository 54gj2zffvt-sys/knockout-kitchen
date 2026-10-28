export default function ProgressRing({ value, max, size = 220, stroke = 18, color = 'var(--accent)', children }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0))
  const offset = circumference * (1 - pct)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="var(--surface-2)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <foreignObject x="0" y="0" width={size} height={size}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  )
}

export function MiniBar({ label, value, max, color }) {
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0))
  return (
    <div className="flex-1">
      <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-dim)' }}>
        <span>{label}</span>
        <span>{Math.round(value)}/{Math.round(max)}g</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}
