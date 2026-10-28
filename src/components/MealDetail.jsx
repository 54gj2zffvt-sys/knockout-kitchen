import { getDisliked, toggleDisliked } from '../data/storage'
import { photoForMeal } from '../data/photos'
import { useState } from 'react'

export default function MealDetail({ meal, onBack, onCook }) {
  const [disliked, setDisliked] = useState(() => getDisliked().includes(meal.id))

  const toggle = () => {
    const list = toggleDisliked(meal.id)
    setDisliked(list.includes(meal.id))
  }

  return (
    <div className="pb-10">
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="text-xl active:opacity-60" style={{ color: 'var(--text)' }}>←</button>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{meal.name}</h2>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{meal.time}</p>
        </div>
      </header>

      <img
        src={photoForMeal(meal)} alt={meal.name}
        className="mx-5 w-[calc(100%-2.5rem)] h-44 rounded-2xl object-cover mb-4 food-img"
        style={{ background: 'var(--surface-2)' }}
      />

      {disliked && (
        <div className="mx-5 mb-4 rounded-xl p-3 text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-dim)' }}>
          Marcada como "no me gusta" — la app no la va a volver a poner. Mira las sustituciones abajo mientras se actualiza el menú.
        </div>
      )}

      <section className="px-5 mb-5">
        <div className="grid grid-cols-4 gap-2 text-center">
          <Stat label="kcal" value={meal.macros.kcal} />
          <Stat label="Proteína" value={`${meal.macros.protein}g`} color="var(--protein)" />
          <Stat label="Carbos" value={`${meal.macros.carbs}g`} color="var(--carbs)" />
          <Stat label="Grasa" value={`${meal.macros.fat}g`} color="var(--fat)" />
        </div>
      </section>

      {meal.why && (
        <section className="px-5 mb-5">
          <p className="text-sm italic" style={{ color: 'var(--text-dim)' }}>{meal.why}</p>
        </section>
      )}

      <section className="px-5 mb-5">
        <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>Alimentos</h3>
        <div className="rounded-2xl divide-y" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {meal.foods.map((f, i) => (
            <div key={i} className="flex justify-between px-4 py-3 text-sm" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>
              <span>{f.name}</span>
              <span style={{ color: 'var(--text-dim)' }}>{f.qty}</span>
            </div>
          ))}
        </div>
      </section>

      {meal.recipe?.length > 0 && (
        <section className="px-5 mb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dim)' }}>Receta</h3>
            {onCook && (
              <button
                onClick={() => onCook(meal)}
                className="text-xs px-3 py-1.5 rounded-lg font-medium active:scale-95 transition"
                style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
              >
                👨‍🍳 Modo cocina
              </button>
            )}
          </div>
          <ol className="flex flex-col gap-2">
            {meal.recipe.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text)' }}>
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
                >
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {meal.substitutes?.length > 0 && (
        <section className="px-5 mb-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dim)' }}>Sustituciones</h3>
          <div className="flex flex-col gap-1.5">
            {meal.substitutes.map((s, i) => (
              <div key={i} className="text-sm px-4 py-2 rounded-xl" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>
                {s}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-5">
        <button
          onClick={toggle}
          className="w-full py-3 rounded-2xl text-sm font-medium active:scale-95 transition"
          style={{ background: disliked ? 'var(--accent)' : 'var(--surface-2)', color: disliked ? 'var(--accent-ink)' : 'var(--text)' }}
        >
          {disliked ? '✓ Marcada como no me gusta' : 'No me gusta esta comida'}
        </button>
      </section>
    </div>
  )
}

function Stat({ label, value, color = 'var(--text)' }) {
  return (
    <div className="rounded-xl py-2" style={{ background: 'var(--surface-2)' }}>
      <div className="text-sm font-bold" style={{ color }}>{value}</div>
      <div className="text-[10px]" style={{ color: 'var(--text-dim)' }}>{label}</div>
    </div>
  )
}
