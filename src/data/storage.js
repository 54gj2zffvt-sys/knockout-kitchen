// Almacenamiento local (localStorage), con sincronización opcional a Supabase (ver data/sync.js).
// localStorage sigue siendo la fuente inmediata (la app funciona sin internet); sync.js empuja
// cada cambio al proyecto compartido y aplica lo que llega del otro teléfono en tiempo real.

const KEY_PROFILE = 'esquina_profile'
const KEY_PIN = 'esquina_pin'
const mealsKey = (date) => `esquina_meals_${date}`
const waterKey = (date) => `esquina_water_${date}`
const KEY_WEIGHTS = 'esquina_weights'
const KEY_DISLIKED = 'esquina_disliked'

let onWriteHook = null
// sync.js se registra aquí (sin import circular) para enterarse de cada escritura local y
// mandarla a Supabase con un pequeño debounce.
export const setOnWriteHook = (fn) => { onWriteHook = fn }

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    if (key.startsWith('esquina_')) onWriteHook?.()
  } catch {
    // almacenamiento no disponible (modo privado, etc.) — la app sigue funcionando sin guardar
  }
}

export const getProfile = () => read(KEY_PROFILE, null)
export const setProfile = (p) => write(KEY_PROFILE, p)

export const getPin = () => read(KEY_PIN, null)
export const setPin = (pin) => write(KEY_PIN, pin)

export const getMealStatus = (date) => read(mealsKey(date), {})
export const setMealStatus = (date, mealId, status) => {
  const current = getMealStatus(date)
  current[mealId] = status
  write(mealsKey(date), current)
}

export const getWater = (date) => read(waterKey(date), 0)
export const addWater = (date, liters) => {
  const current = getWater(date)
  const next = Math.max(0, +(current + liters).toFixed(2))
  write(waterKey(date), next)
  return next
}

const byDate = (a, b) => a.date.localeCompare(b.date)
export const getWeights = () => read(KEY_WEIGHTS, []).slice().sort(byDate)
export const addWeight = (entry) => {
  const current = read(KEY_WEIGHTS, [])
  current.push(entry)
  write(KEY_WEIGHTS, current)
  return getWeights()
}

const KEY_SHOPPING = 'esquina_shopping_checks'
export const getShoppingChecks = () => read(KEY_SHOPPING, {})
export const toggleShoppingCheck = (itemId) => {
  const current = getShoppingChecks()
  current[itemId] = !current[itemId]
  write(KEY_SHOPPING, current)
  return current
}

export const getDisliked = () => read(KEY_DISLIKED, [])
export const toggleDisliked = (mealId) => {
  const current = getDisliked()
  const next = current.includes(mealId) ? current.filter((id) => id !== mealId) : [...current, mealId]
  write(KEY_DISLIKED, next)
  return next
}

const KEY_THEME = 'esquina_theme'
export const getTheme = () => read(KEY_THEME, 'auto')
export const setTheme = (t) => write(KEY_THEME, t)

// Comí fuera del plan — registro aproximado por día
const offplanKey = (date) => `esquina_offplan_${date}`
export const getOffPlan = (date) => read(offplanKey(date), [])
export const addOffPlan = (date, item) => {
  const current = getOffPlan(date)
  current.push(item)
  write(offplanKey(date), current)
  return current
}

// Chequeo semanal (domingo): peso, energía, hambre, sueño, rendimiento
const KEY_CHECKINS = 'esquina_checkins'
export const getCheckins = () => read(KEY_CHECKINS, []).slice().sort(byDate)
export const addCheckin = (entry) => {
  const current = read(KEY_CHECKINS, [])
  current.push(entry)
  write(KEY_CHECKINS, current)
  return getCheckins()
}

// Ajuste automático de calorías — multiplicador sobre kcal/carbos/grasa (nunca proteína)
const KEY_ADJUSTMENT = 'esquina_adjustment'
export const getAdjustment = () => read(KEY_ADJUSTMENT, { multiplier: 1, history: [] })
export const applyAdjustment = (multiplier, reason) => {
  const current = getAdjustment()
  const next = {
    multiplier,
    history: [...current.history, { date: todayISO(), multiplier, reason }],
  }
  write(KEY_ADJUSTMENT, next)
  return next
}

// Cambio manual de tipo de día (examen, cambio de horario de entrenamiento, etc.)
// Se guarda por fecha y se aplica encima del calendario base — no modifica el plan original.
const KEY_OVERRIDES = 'esquina_day_overrides'
export const getDayOverride = (date) => read(KEY_OVERRIDES, {})[date] ?? null
export const setDayOverride = (date, type) => {
  const current = read(KEY_OVERRIDES, {})
  if (type) current[date] = type
  else delete current[date]
  write(KEY_OVERRIDES, current)
  return current
}

// Notificaciones (preferencias locales)
const KEY_NOTIFS = 'esquina_notifs'
export const getNotifPrefs = () => read(KEY_NOTIFS, { comidas: false, agua: false })
export const setNotifPrefs = (prefs) => write(KEY_NOTIFS, prefs)

export function todayISO() {
  const d = new Date()
  const tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return tz.toISOString().slice(0, 10)
}
