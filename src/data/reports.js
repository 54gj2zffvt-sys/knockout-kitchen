// Cálculo de reportes semanales — Progreso. Reglas de ajuste: ver plan-fase4/ajustes-automaticos.md
import { getPlanForDate, adjustedTarget, hydrationTarget } from './plan'
import { getMealStatus, getWater, getWeights, getOffPlan, getCheckins, getAdjustment, todayISO as todayISOForReports } from './storage'

const STATUS_WEIGHT = { full: 1, half: 0.5, none: 0 }

function toISO(d) {
  const tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return tz.toISOString().slice(0, 10)
}

export function weekStart(dateISO) {
  const d = new Date(dateISO + 'T00:00:00')
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return toISO(d)
}

export function datesOfWeek(startISO) {
  const d = new Date(startISO + 'T00:00:00')
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d)
    x.setDate(d.getDate() + i)
    return toISO(x)
  })
}

export function computeWeekStats(startISO) {
  const dates = datesOfWeek(startISO)
  const multiplier = getAdjustment().multiplier
  let mealsTotal = 0, mealsDone = 0, daysWithPlan = 0, daysCompliant = 0, offPlanCount = 0
  let sumKcal = 0, sumTargetKcal = 0, sumProtein = 0, sumTargetProtein = 0
  let sumCarbs = 0, sumTargetCarbs = 0, sumFat = 0, sumTargetFat = 0
  let sumWater = 0, sumWaterTarget = 0

  for (const date of dates) {
    const plan = getPlanForDate(date)
    if (!plan || plan.type === 'viaje') continue
    daysWithPlan++
    const target = adjustedTarget(plan.type, multiplier)
    const statuses = getMealStatus(date)
    const off = getOffPlan(date)
    offPlanCount += off.length

    let dayKcal = 0, dayProtein = 0, dayCarbs = 0, dayFat = 0
    plan.meals.forEach((m) => {
      mealsTotal++
      const w = STATUS_WEIGHT[statuses[m.id]] ?? 0
      if (w > 0) mealsDone += w
      dayKcal += m.macros.kcal * w
      dayProtein += m.macros.protein * w
      dayCarbs += m.macros.carbs * w
      dayFat += m.macros.fat * w
    })
    off.forEach((item) => { dayKcal += item.kcal; dayProtein += item.protein; dayCarbs += item.carbs; dayFat += item.fat })

    sumKcal += dayKcal; sumTargetKcal += target.kcal
    sumProtein += dayProtein; sumTargetProtein += target.protein
    sumCarbs += dayCarbs; sumTargetCarbs += target.carbs
    sumFat += dayFat; sumTargetFat += target.fat
    sumWater += getWater(date); sumWaterTarget += hydrationTarget(plan.type)

    if (dayKcal >= target.kcal * 0.85 && dayKcal <= target.kcal * 1.15) daysCompliant++
  }

  const weights = getWeights().filter((w) => dates.includes(w.date))
  const weightAvg = weights.length ? weights.reduce((s, w) => s + w.kg, 0) / weights.length : null

  const checkins = getCheckins().filter((c) => c.weekStart === startISO)
  const checkin = checkins[checkins.length - 1] ?? null

  return {
    startISO,
    dates,
    daysWithPlan,
    daysCompliant,
    mealsTotal,
    mealsDone,
    offPlanCount,
    pctMealsDone: mealsTotal ? Math.round((mealsDone / mealsTotal) * 100) : 0,
    avgKcal: daysWithPlan ? Math.round(sumKcal / daysWithPlan) : 0,
    avgTargetKcal: daysWithPlan ? Math.round(sumTargetKcal / daysWithPlan) : 0,
    avgProtein: daysWithPlan ? Math.round(sumProtein / daysWithPlan) : 0,
    avgTargetProtein: daysWithPlan ? Math.round(sumTargetProtein / daysWithPlan) : 0,
    avgCarbs: daysWithPlan ? Math.round(sumCarbs / daysWithPlan) : 0,
    avgTargetCarbs: daysWithPlan ? Math.round(sumTargetCarbs / daysWithPlan) : 0,
    avgFat: daysWithPlan ? Math.round(sumFat / daysWithPlan) : 0,
    avgTargetFat: daysWithPlan ? Math.round(sumTargetFat / daysWithPlan) : 0,
    avgWater: daysWithPlan ? +(sumWater / daysWithPlan).toFixed(2) : 0,
    avgWaterTarget: daysWithPlan ? +(sumWaterTarget / daysWithPlan).toFixed(2) : 0,
    weightAvg: weightAvg ? +weightAvg.toFixed(1) : null,
    checkin,
  }
}

// Racha de días "cumplidos": todas las comidas marcadas y calorías dentro de ±15% del objetivo.
export function computeStreak(untilISO) {
  let streak = 0
  const d = new Date(untilISO + 'T00:00:00')
  const multiplier = getAdjustment().multiplier
  for (let i = 0; i < 60; i++) {
    const dateISO = toISO(d)
    const plan = getPlanForDate(dateISO)
    if (!plan || plan.type === 'viaje') { d.setDate(d.getDate() - 1); continue }
    const target = adjustedTarget(plan.type, multiplier)
    const statuses = getMealStatus(dateISO)
    const allMarked = plan.meals.every((m) => statuses[m.id])
    if (!allMarked) break
    const kcal = plan.meals.reduce((s, m) => s + m.macros.kcal * (STATUS_WEIGHT[statuses[m.id]] ?? 0), 0)
    if (kcal < target.kcal * 0.85 || kcal > target.kcal * 1.15) break
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

// Sugerencia de ajuste de calorías — ver plan-fase4/ajustes-automaticos.md para el razonamiento completo.
export function suggestAdjustment(recentWeekStats, alerts, adjustmentHistory = []) {
  if (alerts.length > 0) return null // una alerta activa bloquea cualquier sugerencia de más déficit
  if (recentWeekStats.length < 2) return null // hace falta al menos 2 semanas de datos

  // Como mucho un ajuste cada 2 semanas — si ya se aplicó uno hace menos de 14 días, no se repite la sugerencia.
  const lastChange = adjustmentHistory[adjustmentHistory.length - 1]
  if (lastChange) {
    const daysSince = (new Date(todayISOForReports()) - new Date(lastChange.date)) / 86400000
    if (daysSince < 14) return null
  }

  const last = recentWeekStats[recentWeekStats.length - 1]
  const prev = recentWeekStats[recentWeekStats.length - 2]
  if (last.weightAvg == null || prev.weightAvg == null) return null

  const weeklyChange = last.weightAvg - prev.weightAvg // negativo = bajó de peso

  if (weeklyChange < -0.7) {
    return { action: 'increase', pct: 5, reason: `Bajó ${Math.abs(weeklyChange).toFixed(1)} kg esta semana — más rápido del techo seguro (0.7 kg/semana). Subir un poco las calorías protege músculo y rendimiento.` }
  }
  if (weeklyChange > -0.15 && recentWeekStats.length >= 3) {
    const prev2 = recentWeekStats[recentWeekStats.length - 3]
    const change2 = prev2.weightAvg != null ? prev.weightAvg - prev2.weightAvg : null
    const bothSlow = change2 != null && change2 > -0.15
    if (bothSlow && last.pctMealsDone >= 80) {
      return { action: 'decrease', pct: 5, reason: 'El peso casi no bajó en las últimas 2 semanas y el cumplimiento fue bueno — bajar un poco las calorías puede reactivar el progreso.' }
    }
    if (bothSlow && last.pctMealsDone < 80) {
      return { action: 'none', pct: 0, reason: 'El peso casi no bajó, pero el cumplimiento tampoco fue alto esa semana — antes de bajar calorías, vale más enfocarse en seguir el plan como está.' }
    }
  }
  return null
}

export function checkAlerts(recentWeekStats, recentCheckins) {
  const alerts = []
  if (recentWeekStats.length >= 2) {
    const last = recentWeekStats[recentWeekStats.length - 1]
    const prev = recentWeekStats[recentWeekStats.length - 2]
    if (last.weightAvg != null && prev.weightAvg != null) {
      const change = last.weightAvg - prev.weightAvg
      if (change < -1.0) alerts.push('El peso bajó más de 1 kg en una semana — más rápido de lo seguro. Coméntalo con un médico antes de seguir.')
    }
  }
  if (recentCheckins.length >= 2) {
    const lastTwo = recentCheckins.slice(-2)
    const lowEnergy = lastTwo.every((c) => c.energia <= 2)
    const lowSleep = lastTwo.every((c) => c.sueno <= 2)
    if (lowEnergy) alerts.push('Energía baja reportada 2 semanas seguidas — vale la pena comentarlo con un médico, puede ser una señal de estar comiendo muy por debajo de lo necesario.')
    if (lowSleep) alerts.push('Sueño reportado como malo 2 semanas seguidas — puede afectar la recuperación; si persiste, coméntalo con un médico.')
  }
  return alerts
}

export function generateTips(stats) {
  const tips = []
  if (stats.avgProtein < stats.avgTargetProtein * 0.85) {
    tips.push(`La proteína quedó baja esta semana (~${stats.avgProtein}g de ${stats.avgTargetProtein}g objetivo) — reforzar con huevo, pollo o atún en las comidas que más se saltan.`)
  }
  if (stats.avgWater < stats.avgWaterTarget * 0.8) {
    tips.push(`El agua quedó por debajo de la meta (${stats.avgWater}L de ${stats.avgWaterTarget}L) — sobre todo cuidar los días de doble sesión.`)
  }
  if (stats.offPlanCount >= 3) {
    tips.push(`Hubo ${stats.offPlanCount} comidas fuera del plan esta semana — está bien de vez en cuando, pero si se repite, puede valer la pena ajustar el día libre del plan.`)
  }
  if (stats.pctMealsDone >= 90) {
    tips.push('Muy buen cumplimiento esta semana — seguir así.')
  } else if (stats.pctMealsDone < 60) {
    tips.push('El cumplimiento bajó esta semana — si algo del horario o las porciones no está funcionando, vale la pena ajustarlo en vez de forzarlo.')
  }
  if (tips.length === 0) tips.push('Semana estable, sin nada puntual que ajustar.')
  return tips.slice(0, 5)
}
