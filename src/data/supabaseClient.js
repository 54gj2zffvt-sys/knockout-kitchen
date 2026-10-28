import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Proyecto compartido con RONDA (app de entrenamiento) — misma cuenta/proyecto de Supabase,
// tabla propia `nutricion_state` (no se toca `bitacora_state`, esa es de RONDA).
export const supabase = url && anonKey ? createClient(url, anonKey) : null
export const SYNC_ROW_ID = 'martin-nutricion'
export const TABLE = 'nutricion_state'
