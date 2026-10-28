import { useId } from 'react'

export default function Sparkline({ points, width = 280, height = 70, color = 'var(--accent)' }) {
  const gradientId = useId()

  if (points.length < 2) {
    return <p className="text-xs" style={{ color: 'var(--text-dim)' }}>Hace falta más de un dato para ver la tendencia.</p>
  }
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)
  const coords = points.map((p, i) => {
    const x = i * step
    const y = height - ((p - min) / range) * (height - 10) - 5
    return [x, y]
  })
  const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const fillPath = `${linePath} L${coords[coords.length - 1][0].toFixed(1)},${height} L0,${height} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.35 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradientId})`} stroke="none" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === coords.length - 1 ? 4 : 2.5} fill={color} />
      ))}
    </svg>
  )
}
