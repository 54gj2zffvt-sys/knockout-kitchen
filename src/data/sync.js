// Sincronización entre los dos teléfonos (Martín y mamá) vía Supabase — una sola fila
// compartida con todo el estado de la app en un JSON. localStorage sigue siendo la copia
// local (la app funciona offline); esto solo empuja/trae cambios cuando hay internet.
import { supabase, SYNC_ROW_ID, TABLE } from './supabaseClient'
import { setOnWriteHook } from './storage'

const LAST_SYNC_KEY = 'esquina_last_sync_at'
let pushTimer = null
let applyingRemote = false // evita que pullState() dispare otro push al reescribir localStorage

function collectLocalState() {
  const state = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('esquina_') && key !== LAST_SYNC_KEY) {
      state[key] = localStorage.getItem(key)
    }
  }
  return state
}

async function pushState() {
  if (!supabase || applyingRemote) return
  const state = collectLocalState()
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: SYNC_ROW_ID, state, updated_at: new Date().toISOString() })
  if (!error) localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString())
}

function schedulePush() {
  if (!supabase) return
  clearTimeout(pushTimer)
  pushTimer = setTimeout(pushState, 1200)
}

function applyRemoteState(state) {
  if (!state) return
  applyingRemote = true
  try {
    Object.entries(state).forEach(([key, value]) => {
      if (key.startsWith('esquina_')) localStorage.setItem(key, value)
    })
  } finally {
    applyingRemote = false
  }
}

export async function pullState() {
  if (!supabase) return false
  const { data, error } = await supabase.from(TABLE).select('state, updated_at').eq('id', SYNC_ROW_ID).maybeSingle()
  if (error || !data) return false
  applyRemoteState(data.state)
  localStorage.setItem(LAST_SYNC_KEY, data.updated_at)
  return true
}

let channel = null
export function subscribeRealtime(onRemoteChange) {
  if (!supabase || channel) return
  channel = supabase
    .channel('nutricion_state_changes')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: TABLE, filter: `id=eq.${SYNC_ROW_ID}` }, (payload) => {
      applyRemoteState(payload.new?.state)
      onRemoteChange?.()
    })
    .subscribe()
}

export function initSync(onRemoteChange) {
  if (!supabase) return // sin configurar todavía — la app sigue funcionando solo local
  setOnWriteHook(schedulePush)
  pullState().then(() => onRemoteChange?.())
  subscribeRealtime(onRemoteChange)
}

export const isSyncConfigured = () => !!supabase
