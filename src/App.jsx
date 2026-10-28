import { useEffect, useState } from 'react'
import { getProfile, getTheme, todayISO } from './data/storage'
import ProfileGate from './components/ProfileGate'
import BottomNav from './components/BottomNav'
import TodayScreen from './components/TodayScreen'
import MealDetail from './components/MealDetail'
import WeekScreen from './components/WeekScreen'
import CocinaScreen from './components/CocinaScreen'
import ProgresoScreen from './components/ProgresoScreen'
import MoreScreen from './components/MoreScreen'
import TravelScreen from './components/TravelScreen'
import CookMode from './components/CookMode'
import Splash from './components/Splash'
import { initSync } from './data/sync'

export default function App() {
  const [booting, setBooting] = useState(true)
  const [profile, setProfileState] = useState(() => getProfile())
  const [tab, setTab] = useState('hoy')
  const [selectedDate, setSelectedDate] = useState(todayISO())
  const [openMeal, setOpenMeal] = useState(null)
  const [showTravel, setShowTravel] = useState(false)
  const [cookingMeal, setCookingMeal] = useState(null)
  const [syncTick, setSyncTick] = useState(0)

  useEffect(() => {
    const t = getTheme()
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light')
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  // Sincroniza con el otro teléfono vía Supabase (si ya está configurado) — trae lo que haya
  // cambiado del lado del otro perfil y se queda escuchando cambios en tiempo real.
  useEffect(() => {
    initSync(() => setSyncTick((n) => n + 1))
  }, [])

  if (booting) {
    return <Splash onDone={() => setBooting(false)} />
  }

  if (!profile) {
    return <ProfileGate onSelect={setProfileState} />
  }

  const openMealFor = (meal) => setOpenMeal(meal)
  const closeMeal = () => setOpenMeal(null)

  const selectDayFromWeek = (iso) => {
    setSelectedDate(iso)
    setTab('hoy')
  }

  if (cookingMeal) {
    return <CookMode meal={cookingMeal} onExit={() => setCookingMeal(null)} />
  }

  let content = null
  if (openMeal) {
    content = <MealDetail meal={openMeal} onBack={closeMeal} onCook={setCookingMeal} />
  } else if (showTravel) {
    content = <TravelScreen onBack={() => setShowTravel(false)} />
  } else if (tab === 'hoy') {
    content = <TodayScreen dateISO={selectedDate} onOpenMeal={openMealFor} />
  } else if (tab === 'semana') {
    content = <WeekScreen referenceDate={selectedDate} onSelectDay={selectDayFromWeek} />
  } else if (tab === 'cocina') {
    content = <CocinaScreen onOpenMeal={openMealFor} onCook={setCookingMeal} />
  } else if (tab === 'progreso') {
    content = <ProgresoScreen />
  } else if (tab === 'ajustes') {
    content = (
      <MoreScreen
        profile={profile}
        onChangeProfile={(p) => setProfileState(p)}
        onOpenTravel={() => setShowTravel(true)}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', paddingTop: 'var(--safe-top)' }}>
      <div key={syncTick}>{content}</div>
      {!openMeal && !showTravel && <BottomNav active={tab} onChange={setTab} profile={profile} />}
    </div>
  )
}
