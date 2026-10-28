export default function TravelScreen({ onBack }) {
  return (
    <div className="px-5 pt-6 pb-28">
      <header className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="text-xl active:opacity-60" style={{ color: 'var(--text)' }}>←</button>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Modo viaje — 2 al 9 nov</h2>
      </header>

      <Card title="El objetivo esta semana">
        No hay BJJ ni recetas fijas. La meta no es bajar de peso esta semana — es no ganar grasa, manteniendo proteína. Se retoma el plan normal al volver.
      </Card>

      <Card title="El método de la mano (sin báscula)">
        <ul className="list-disc pl-4 space-y-1">
          <li><b>Proteína:</b> una palma de la mano por comida principal.</li>
          <li><b>Carbohidrato:</b> un puño cerrado (puño y medio en día de gym).</li>
          <li><b>Vegetales:</b> lo que llene el resto del plato.</li>
          <li><b>Grasa extra:</b> el tamaño del pulgar.</li>
        </ul>
      </Card>

      <Card title="Las 3 cosas que más engordan en el viaje">
        <ol className="list-decimal pl-4 space-y-1">
          <li>Bebidas azucaradas → cambiar por agua o té sin azúcar.</li>
          <li>Porciones de restaurante (1.5-2x lo normal) → pedir normal o compartir.</li>
          <li>Frituras/pan en exceso → está bien 1-2 veces en la semana, no en cada comida.</li>
        </ol>
      </Card>

      <Card title="Gimnasio (lo que haya)">
        Full body 45-60 min, 4-5 veces: sentadilla/prensa, press de banca o mancuernas, remo, press de hombro, core. 3-4 series de 8-12 reps. Sin pesas suficientes: flexiones, sentadillas, zancadas, plancha, burpees — circuito 20-30 min.
      </Card>

      <Card title="Hidratación">
        ~3-3.3 litros al día, más si hay vuelos largos o calor.
      </Card>

      <Card title="Al volver (11 nov)">
        Sin "compensar" con dieta extrema. Se retoma el plan normal el martes, sin culpa.
      </Card>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl p-4 mb-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>{title}</p>
      <div className="text-sm" style={{ color: 'var(--text-dim)' }}>{children}</div>
    </div>
  )
}
