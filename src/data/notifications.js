// Recordatorios locales — funcionan mientras la app está abierta o recién en segundo plano.
// LIMITACIÓN HONESTA: Safari/iOS no tiene una API para "avisar mañana a las 6:30" con la app
// cerrada del todo (eso necesitaría push real desde un servidor, que llega en una etapa
// posterior cuando se conecte Supabase). Mientras tanto, esto es un buen apoyo si la app
// queda abierta en segundo plano, pero no un reemplazo 100% confiable de una alarma.

export async function requestPermission() {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  return await Notification.requestPermission()
}

export function scheduleMealReminders(meals) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return []
  const now = new Date()
  const timers = []
  meals.forEach((m) => {
    const [h, min] = m.time.split(':').map(Number)
    const target = new Date(now)
    target.setHours(h, min, 0, 0)
    const ms = target - now
    if (ms <= 0) return
    const id = setTimeout(() => {
      new Notification(`Hora de: ${m.name}`, { body: `${m.macros.kcal} kcal — toca para ver la receta`, icon: `${import.meta.env.BASE_URL}icons/icon-192.png` })
    }, ms)
    timers.push(id)
  })
  return timers
}

export function scheduleWaterReminder(intervalMinutes = 90) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return null
  return setInterval(() => {
    new Notification('💧 Toma agua', { body: 'Un recordatorio rápido para mantenerte hidratado.', icon: `${import.meta.env.BASE_URL}icons/icon-192.png` })
  }, intervalMinutes * 60 * 1000)
}
